/*
 * Copyright (C) 2020 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

import sinon = require("sinon");
import * as chai from "chai";
import sinonChai = require("sinon-chai");

import * as dataServiceRead from "../../lib";
import { IndexApi } from "@here/olp-sdk-dataservice-api";

chai.use(sinonChai);

const assert = chai.assert;
const expect = chai.expect;

describe("IndexLayerClient", () => {
    let sandbox: sinon.SinonSandbox;
    let getIndexStub: sinon.SinonStub;
    let getBaseUrlRequestStub: sinon.SinonStub;
    let indexLayerClient: dataServiceRead.IndexLayerClient;
    const mockedHRN = dataServiceRead.HRN.fromString(
        "hrn:here:data:::mocked-hrn"
    );
    const mockedLayerId = "mocked-layed-id";
    const fakeURL = "http://fake-base.url";

    before(() => {
        sandbox = sinon.createSandbox();
        let settings = sandbox.createStubInstance(
            dataServiceRead.OlpClientSettings
        );
        indexLayerClient = new dataServiceRead.IndexLayerClient(
            mockedHRN,
            mockedLayerId,
            (settings as unknown) as dataServiceRead.OlpClientSettings
        );
    });

    beforeEach(() => {
        getIndexStub = sandbox.stub(IndexApi, "performQuery");
        getBaseUrlRequestStub = sandbox.stub(
            dataServiceRead.RequestFactory,
            "getBaseUrl"
        );
        getBaseUrlRequestStub.callsFake(() => Promise.resolve(fakeURL));
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Shoud be initialised", async () => {
        assert.isDefined(indexLayerClient);
        expect(indexLayerClient).be.instanceOf(
            dataServiceRead.IndexLayerClient
        );
    });

    it("Should method getPartitions provide data with IndexQueryRequest", async () => {
        const mockedIndexResponse = {
            data: [
                {
                    id: "8c0e5ac9-b036-4365-8820-dfcba64588fc",
                    size: 111928,
                    checksum: "448a33cd65c47bed1eeb4d72e7fa022c95a41158",
                    timestamp: 1551981674191,
                    hour_from: 1506402000000,
                    tile_id: 377894442,
                    crc: null
                },
                {
                    id: "a2ee29d9-4812-4322-b028-bded0bd2b92f",
                    size: 397246,
                    checksum: "cb2666fb46ba98788b88c905a766f5675366ef7f",
                    timestamp: 1551981674191,
                    hour_from: 1506402000000,
                    tile_id: 377894440,
                    crc: null
                },
                {
                    id: "a439ca8d-a3b5-4fdc-8513-4e3697c4fbc7",
                    size: 364671,
                    checksum: "0c12b693835a86c02a0b0028cea24d12371acdce",
                    timestamp: 1551981674191,
                    hour_from: 1506402000000,
                    tile_id: 377894444,
                    crc: null
                }
            ]
        };
        getIndexStub.callsFake(
            (builder: any, params: any): Promise<IndexApi.DataResponse> => {
                return Promise.resolve(mockedIndexResponse);
            }
        );

        const request = new dataServiceRead.IndexQueryRequest().withQueryString(
            "hour_from>0"
        );
        const partitions = await indexLayerClient.getPartitions(request);

        assert.isDefined(partitions);
        expect(partitions).to.be.equal(mockedIndexResponse.data);
    });

    it("Should method getPartitions return error without IndexQueryRequest", async () => {
        const mockedErrorResponse = "Please provide correct query";

        const request = new dataServiceRead.IndexQueryRequest();
        const partitions = await indexLayerClient
            .getPartitions(request)
            .catch(error => {
                assert.isDefined(error);
                assert.equal(mockedErrorResponse, error);
            });
    });

    it("Should method getPartitions be aborted fetching by abort signal", async () => {
        const mockedBlobData = new Response("mocked-blob-response");
        const mockedIndexResponse = {
            data: [
                {
                    id: "8c0e5ac9-b036-4365-8820-dfcba64588fc",
                    size: 111928,
                    checksum: "448a33cd65c47bed1eeb4d72e7fa022c95a41158",
                    timestamp: 1551981674191,
                    hour_from: 1506402000000,
                    tile_id: 377894442,
                    crc: null
                },
                {
                    id: "a2ee29d9-4812-4322-b028-bded0bd2b92f",
                    size: 397246,
                    checksum: "cb2666fb46ba98788b88c905a766f5675366ef7f",
                    timestamp: 1551981674191,
                    hour_from: 1506402000000,
                    tile_id: 377894440,
                    crc: null
                },
                {
                    id: "a439ca8d-a3b5-4fdc-8513-4e3697c4fbc7",
                    size: 364671,
                    checksum: "0c12b693835a86c02a0b0028cea24d12371acdce",
                    timestamp: 1551981674191,
                    hour_from: 1506402000000,
                    tile_id: 377894444,
                    crc: null
                }
            ]
        };
        getIndexStub.callsFake(
            (builder: any, params: any): Promise<IndexApi.DataResponse> => {
                return builder.abortSignal.aborted
                    ? Promise.reject("AbortError")
                    : Promise.resolve(mockedIndexResponse);
            }
        );

        const request = new dataServiceRead.IndexQueryRequest().withQueryString(
            "hour_from>0"
        );

        const abortController = new AbortController();

        indexLayerClient
            .getPartitions(
                (request as unknown) as dataServiceRead.IndexQueryRequest,
                abortController.signal
            )
            .then()
            .catch((err: any) => {
                assert.strictEqual(err, "AbortError");
                assert.isTrue(abortController.signal.aborted);
            });

        abortController.abort();
    });
});