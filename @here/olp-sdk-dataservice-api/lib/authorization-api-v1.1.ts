/*
 * Copyright (C) 2020 HERE Global B.V. and its affiliate(s).
 * All rights reserved.
 *
 * This software and other materials contain proprietary information
 * controlled by HERE and are protected by applicable copyright legislation.
 * Any use and utilization of this software and other materials and
 * disclosure to any third parties is conditional upon having a separate
 * agreement with HERE for the access, use, utilization or disclosure of this
 * software. In the absence of such agreement, the use of the software is not
 * allowed.
 */

/**
 * Authorization API v1.1
 *   This specification is intended to describe the Authorization v1.1 APIs
 *
 *   OpenAPI spec version: 1.1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Do not edit the class manually.
 */

import { RequestBuilder, RequestOptions, UrlBuilder } from "./RequestBuilder";

export interface PageWToken {
    /**
     * Total entities
     */
    total?: number;

    /**
     * The pageToken used to retrieve the next page of entities
     */
    pageToken?: string;

    /**
     * number of items returned
     */
    count?: number;
}

export interface Group {
    id?: string;
    hrn?: string;

    /**
     * A user defined name for the group.
     * The following characters are not allowed in the group name: control characters, non-breaking space,
     * and * / < > \\  |
     */
    name: string;

    realm?: string;

    /**
     * An optional user defined description for the group.
     * The following characters are not allowed in the group name: control characters, non-breaking space,
     * and * / < > \\  |
     */
    description?: string;
}

export interface GroupPageWToken extends PageWToken {
    data: Group[];
}

export type StateEnum = "deleted" | "disabled" | "locked" | "enabled";

export interface UserInfo {
    /**
     * The unique identifier of the user.
     */
    userId?: string;
    /**
     * The HRN of the user.
     */
    userHrn?: string;
    /**
     * A realm which the user belongs to.
     */
    realm?: string;
    /**
     * The first name of the user. Only included if entityType is user
     */
    firstname?: string;
    /**
     * The lastname of the user.  Only included if entityType is user
     */
    lastname?: string;
    /**
     * Email address of the user.  Only included if entityType is user
     */
    email?: string;
    /**
     * The status of this user.
     */
    state?: StateEnum;
}

/**
 * Details about the role entity.
 * The provided fields are dependent on the entityType as provided.
 * User: userId, userHrn, realm, firstname, lastname, email, state
 * App: clientId, clientHrn, realm, name, description, ownerId, ownerHrn, defaultScope, isRestrictedScope, appCreationEnabled
 */
export interface RoleEntityInfo extends UserInfo {
    /**
     * Identifier for the client/application.
     */
    clientId?: string;
    /**
     * HRN for the client/application.
     */
    clientHrn?: string;
    /**
     * A realm to which app belongs to.
     */
    realm?: string;
    /**
     * Human readable name of the client.
     */
    name?: string;
    /**
     * Prose description of the client.
     */
    description?: string;
    /**
     * The id of the user that owns this client.
     */
    ownerId?: string;
    /**
     * The hrn of the user that owns this client.
     */
    ownerHrn?: string;
    /**
     * The default value for the \"scope\" parameter when requesting a client_credentials OAuth2 token
     * if no \"scope\" parameter is specified.
     */
    defaultScope?: string;
    /**
     * If true, the app cannot request a token with a scope different from defaultScope.
     */
    isRestrictedScope?: boolean;
    /**
     * If true, the app can create apps.
     */
    appCreationEnabled?: boolean;
}

/**
 * Details about the realm member.
 * The provided fields are dependent on the entityType as provided.
 * User: userId, userHrn, realm, firstname, lastname, email, roles, state
 * App: clientId, clientHrn, realm, name, description, roles, ownerId, ownerHrn, defaultScope, isRestrictedScope, appCreationEnabled
 */
export interface RealmMemberInfo extends UserInfo {
    /**
     * Identifier for the client/application.
     */
    clientId?: string;
    /**
     * HRN for the client/application.
     */
    clientHrn?: string;
    /**
     * A realm to which app belongs to.
     */
    realm?: string;
    /**
     * Human readable name of the client.
     */
    name?: string;
    /**
     * Prose description of the client.
     */
    description?: string;
    /**
     * The id of the user that owns this client.
     */
    ownerId?: string;
    /**
     * The hrn of the user that owns this client.
     */
    ownerHrn?: string;
    /**
     * The default value for the \"scope\" parameter when requesting a client_credentials OAuth2 token
     * if no \"scope\" parameter is specified.
     */
    defaultScope?: string;
    /**
     * If true, the app cannot request a token with a scope different from defaultScope.
     */
    isRestrictedScope?: boolean;
    /**
     * If true, the app can create apps.
     */
    appCreationEnabled?: boolean;
    /**
     * A list of roles assigned to the member. Each entry in the list will be equal to the 'name' of the role.
     */
    roles?: string[];
}

export type EntityTypeEnum = "user" | "app";

export interface RealmMember {
    memberHrn?: string;
    entityType?: EntityTypeEnum;
    info?: RealmMemberInfo;
}

export interface RealmMemberPageWToken extends PageWToken {
    data?: RealmMember[];
}

export interface RealmAuthorizationInvite {
    /**
     * The email address to send the invitation to.
     */
    emailAddress: string;
    /**
     * The first name of the invitee.
     */
    firstName?: string;
    /**
     * The last name of the invitee.
     */
    lastName?: string;
    /**
     * The group memberships to create for this invitation.
     */
    groupHrns?: string[];
}

export interface RealmAuthInviteResponse {
    /**
     * The hrn of the authorization invite.
     */
    hrn?: string;
    /**
     * The email address of the user.
     */
    emailAddress?: string;
    /**
     * The first name of the invitee.
     */
    firstName?: string;
    /**
     * The last name of the invitee.
     */
    lastName?: string;
    /**
     * The HRNs of the groups the invitee was added to during invite creation.
     */
    groupHrns?: string[];
    /**
     * The HRN of the entity that created the authorization.
     */
    creatorHrn?: string;
    /**
     * The HRN of the realm of the invitation.
     */
    realmHrn?: string;
    /**
     * Unix time (seconds) when the authorization was created.
     */
    createdTime?: string;
}

export interface ListInviteResponse {
    /**
     * The hrn of the authorization invite.
     */
    hrn?: string;
    /**
     * The email address of the user.
     */
    emailAddress?: string;
    /**
     * The first name of the invitee.
     */
    firstName?: string;
    /**
     * The last name of the invitee.
     */
    lastName?: string;
    /**
     * The HRN of the entity that created the authorization.
     */
    creatorHrn?: string;
    /**
     * The HRN of the realm of the invitation.
     */
    realmHrn?: string;
    /**
     * Unix time (seconds) when the authorization was created.
     */
    createdTime?: string;
}

export interface InvitePageWToken extends PageWToken {
    data?: ListInviteResponse[];
}

/**
 * Retrieve the groups a given entity is a member of. Restrictions:
 * The calling principal **must** have permission to take the **readGroups** action against the specified entity.
 *
 * @example: In order to retrieve the groups a user, HERE-4ba9aca3-fdf9-4cad-a3da-534494d6198f, is a member of,
 * a permission with the following would be required:
 * \"action\" : \"readGroups\"
 * \"resource\" : \"hrn:here:account::myrealm:user/HERE-4ba9aca3-fdf9-4cad-a3da-534494d6198f\"
 * This API works only with tokens that are not scoped to a project
 *
 * @summary Get entity group membership
 * @param realm HRN identifying the realm
 * @param member HRN identifying group or realm member
 * @param pageToken The cursor for pagination. Present only if there is an additional page of data to view.
 * @param count Number of records to return. Default is 100 records. Maximum is 100 records.
 */
export async function getEntityGroupMembership(
    builder: RequestBuilder,
    params: {
        realm: string;
        member: string;
        pageToken?: string;
        count?: number;
    }
): Promise<GroupPageWToken> {
    const baseUrl = "/realms/{realm}/members/{member}/groups"
        .replace("{realm}", UrlBuilder.toString(params["realm"]))
        .replace("{member}", UrlBuilder.toString(params["member"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("pageToken", params["pageToken"]);
    urlBuilder.appendQuery("count", params["count"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<GroupPageWToken>(urlBuilder, options);
}

/**
 * Retrieve the list of groups over which the provided entity has been granted the role of GroupAdmin.
 * Restrictions:
 * * The calling principal **must** have permission to take the **readGroups** action against
 * the specified entity.
 * @example: In order to retrieve the groups a user, HERE-4ba9aca3-fdf9-4cad-a3da-534494d6198f,
 * is an admin of, a permission with the following would be required:
 * * \"action\" : \"readGroups\"
 * * \"resource\" : \"hrn:here:account::myrealm:user/HERE-4ba9aca3-fdf9-4cad-a3da-534494d6198f\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Get entity managed group
 * @param realm HRN identifying the realm
 * @param member HRN identifying group or realm member
 * @param count Number of records to return. Default is 100 records. Maximum is 100 records.
 * @param pageToken The cursor for pagination. Present only if there is an additional page of data to view.
 */
export async function getEntityManagedGroups(
    builder: RequestBuilder,
    params: {
        realm: string;
        member: string;
        count?: number;
        pageToken?: string;
    }
): Promise<GroupPageWToken> {
    const baseUrl = "/realms/{realm}/members/{member}/managedGroups"
        .replace("{realm}", UrlBuilder.toString(params["realm"]))
        .replace("{member}", UrlBuilder.toString(params["member"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("pageToken", params["pageToken"]);
    urlBuilder.appendQuery("count", params["count"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<GroupPageWToken>(urlBuilder, options);
}

/**
 * Retrieve the user or application details of the member defined by memberId. Restrictions:
 * * The calling principal **must** have permission to take the **readMembers** action against
 * the specified realm.
 * @example: In order to retrieve a member of the realm, _MyRealm_, a permission with the following
 * would be required:
 * * \"action\" : \"readMembers\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Get realm member
 * @param realm HRN identifying the realm
 * @param member HRN identifying group or realm member
 */
export async function getRealmMember(
    builder: RequestBuilder,
    params: { realm: string; member: string }
): Promise<RealmMember> {
    const baseUrl = "/realms/{realm}/members/{member}"
        .replace("{realm}", UrlBuilder.toString(params["realm"]))
        .replace("{member}", UrlBuilder.toString(params["member"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<RealmMember>(urlBuilder, options);
}

/**
 * Retrieve the list of members within the realm. Restrictions:
 * * The calling principal **must** have permission to take the **readMembers**
 * action against the specified realm.
 * @example: In order to list the members of the realm, _MyRealm_,
 * a permission with the following would be required:
 * * \"action\" : \"readMembers\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Get realm members
 * @param realm HRN identifying the realm
 * @param pageToken The cursor for pagination. Present only if there is an additional page of data to view.
 * @param count Number of records to return. Default is 100 records. Maximum is 100 records.
 * @param entityType The type of members to return in the result.
 * One of 'user' or 'app'.   If this parameter is omitted, all entity types will be returned.
 * @param q A free text query string used to filter the results.
 * A search against members in the realm will consider the
 * 'userId',
 * 'firstname',
 * 'lastname',
 * 'email',
 * 'clientId',
 * 'name' and 'roles' fields of the members.
 * The precise search algorithm used to match members is not specified,
 * but generally any member where one of the considered fields has a full or partial match should be included in the results.
 * @param state Only return user members with the given 'state' in the results.
 */
export async function getRealmMembers(
    builder: RequestBuilder,
    params: {
        realm: string;
        pageToken?: string;
        count?: number;
        entityType?: string;
        q?: string;
        state?: string;
    }
): Promise<RealmMemberPageWToken> {
    const baseUrl = "/realms/{realm}/members".replace(
        "{realm}",
        UrlBuilder.toString(params["realm"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("pageToken", params["pageToken"]);
    urlBuilder.appendQuery("count", params["count"]);
    urlBuilder.appendQuery("entityType", params["entityType"]);
    urlBuilder.appendQuery("q", params["q"]);
    urlBuilder.appendQuery("state", params["state"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<RealmMemberPageWToken>(urlBuilder, options);
}

/**
 * Cancel an invitation to the realm. Restrictions:
 * * The calling principal **must** have permission to take the **manageInvites**
 * action against the specified realm.
 * @example: In order to delete an invitation to the realm,
 * _MyRealm_, a permission with the following would be required:
 * * \"action\" : \"manageInvites\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Cancel a user invitation to a realm
 * @param realm HRN identifying the realm
 * @param invite HRN identifying a given invite.
 */
export async function cancelRealmMemberInvite(
    builder: RequestBuilder,
    params: { realm: string; invite: string }
): Promise<Response> {
    const baseUrl = "/realms/{realm}/invites/{invite}"
        .replace("{realm}", UrlBuilder.toString(params["realm"]))
        .replace("{invite}", UrlBuilder.toString(params["invite"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "DELETE",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Create and send an invitation to add a new member to the realm,
 * optionally assign membership to one or more groups if the Inviter is also a **GroupAdmin**
 * for the group. Restrictions:
 * * The calling principal **must** have permission to take the
 * **manageInvites** action against the specified realm.
 * @example: In order to invite a new user to the realm, _MyRealm_,
 * a permission with the following would be required:
 * * \"action\" : \"manageInvites\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * @example: In order to invite a new user to the realm, _MyRealm_,
 * as a member of the group GROUP-a3dee2fe-fb38-4183-b686-14fdea5964c0,
 * the following permissions would be required:
 * * \"action\" : \"manageInvites\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * * \"action\" : \"manageMembers\"
 * * \"resource\" : \"hrn:here:authorization::myrealm:group/GROUP-a3dee2fe-fb38-4183-b686-14fdea5964c\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Create and send a user invitation for a realm
 * @param body
 * @param realm HRN identifying the realm
 */
export async function createRealmMemberInvite(
    builder: RequestBuilder,
    params: { body: RealmAuthorizationInvite; realm: string }
): Promise<RealmAuthInviteResponse> {
    const baseUrl = "/realms/{realm}/invites".replace(
        "{realm}",
        UrlBuilder.toString(params["realm"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }

    return builder.request<RealmAuthInviteResponse>(urlBuilder, options);
}

/**
 * Resend an invitation to a new member to the realm.
 * Restrictions:
 * * The calling principal **must** have permission to take the **manageInvites**
 * action against the specified realm.
 *
 * @example: In order to resend an invite to a new user to the realm, _MyRealm_,
 * a permission with the following would be required:
 * * \"action\" : \"manageInvites\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Resend an invitation to a user in a realm
 * @param realm HRN identifying the realm
 * @param invite HRN identifying a given invite.
 */
export async function resendRealmMemberInvite(
    builder: RequestBuilder,
    params: { realm: string; invite: string }
): Promise<Response> {
    const baseUrl = "/realms/{realm}/invites/{invite}"
        .replace("{realm}", UrlBuilder.toString(params["realm"]))
        .replace("{invite}", UrlBuilder.toString(params["invite"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Search for invitations in the realm, optionally providing a group.
 * Restrictions:
 * * The calling principal **must** have permission to take the **manageInvites**
 * action against the realm associated with the calling party.
 *
 * @example: In order to list the invitations within the calling party's realm a permission with the following would be required:
 * * \"action\" : \"manageInvites\"
 * * \"resource\" : \"hrn:here:account::myrealm:realm/myrealm\"
 * * This API works only with tokens that are not scoped to a project.
 *
 * @summary Search for invitations in a realm
 * @param realm HRN identifying the realm
 * @param group HRN idenitifying the group to search.
 * @param pageToken The cursor for pagination. Present only if there is an additional page of data to view.
 * @param count Number of records to return. Default is 100 records. Maximum is 100 records.
 * @param q A free text query string used to filter the results.
 * A search against invites in the realm will consider the 'firstName', 'lastName', and 'emailAddress' fields of the invites.
 * The precise search algorithm used to match invites is not specified, but generally any invite where one
 * of the considered fields has a full or partial match should be included in the results.
 */
export async function searchRealmMemberInvites(
    builder: RequestBuilder,
    params: {
        realm: string;
        group?: string;
        pageToken?: string;
        count?: number;
        q?: string;
    }
): Promise<InvitePageWToken> {
    const baseUrl = "/realms/{realm}/invites".replace(
        "{realm}",
        UrlBuilder.toString(params["realm"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("group", params["group"]);
    urlBuilder.appendQuery("pageToken", params["pageToken"]);
    urlBuilder.appendQuery("count", params["count"]);
    urlBuilder.appendQuery("q", params["q"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<InvitePageWToken>(urlBuilder, options);
}