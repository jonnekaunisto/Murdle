# .DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createLobby**](DefaultApi.md#createLobby) | **POST** /v1/lobby | 
[**createUser**](DefaultApi.md#createUser) | **POST** /v1/user | 
[**describeGame**](DefaultApi.md#describeGame) | **GET** /v1/game/{gameId} | 
[**joinLobby**](DefaultApi.md#joinLobby) | **POST** /v1/lobby/{lobbyId} | 
[**startGame**](DefaultApi.md#startGame) | **POST** /v1/game | 
[**submitGameGuess**](DefaultApi.md#submitGameGuess) | **POST** /v1/game/{gameId}/guess | 
[**updateUser**](DefaultApi.md#updateUser) | **POST** /v1/user/{userId} | 


# **createLobby**
> CreateLobbyResponseContent createLobby()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:any = {};

apiInstance.createLobby(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**CreateLobbyResponseContent**

### Authorization

[smithy.api.httpApiKeyAuth](README.md#smithy.api.httpApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | CreateLobby 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createUser**
> CreateUserResponseContent createUser(createUserRequestContent)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:.DefaultApiCreateUserRequest = {
  // CreateUserRequestContent
  createUserRequestContent: {
    userName: "userName_example",
  },
};

apiInstance.createUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createUserRequestContent** | **CreateUserRequestContent**|  |


### Return type

**CreateUserResponseContent**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | CreateUser 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **describeGame**
> DescribeGameResponseContent describeGame()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:.DefaultApiDescribeGameRequest = {
  // string
  gameId: "gameId_example",
};

apiInstance.describeGame(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **gameId** | [**string**] |  | defaults to undefined


### Return type

**DescribeGameResponseContent**

### Authorization

[smithy.api.httpApiKeyAuth](README.md#smithy.api.httpApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | DescribeGame 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**403** | AccessDeniedException 403 response |  * Access-Control-Allow-Origin -  <br>  |
**404** | ResourceNotFoundException 404 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **joinLobby**
> JoinLobbyResponseContent joinLobby()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:.DefaultApiJoinLobbyRequest = {
  // string
  lobbyId: "lobbyId_example",
};

apiInstance.joinLobby(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **lobbyId** | [**string**] |  | defaults to undefined


### Return type

**JoinLobbyResponseContent**

### Authorization

[smithy.api.httpApiKeyAuth](README.md#smithy.api.httpApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | JoinLobby 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**403** | AccessDeniedException 403 response |  * Access-Control-Allow-Origin -  <br>  |
**404** | ResourceNotFoundException 404 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **startGame**
> StartGameResponseContent startGame()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:any = {};

apiInstance.startGame(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**StartGameResponseContent**

### Authorization

[smithy.api.httpApiKeyAuth](README.md#smithy.api.httpApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | StartGame 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **submitGameGuess**
> SubmitGameGuessResponseContent submitGameGuess(submitGameGuessRequestContent)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:.DefaultApiSubmitGameGuessRequest = {
  // string
  gameId: "gameId_example",
  // SubmitGameGuessRequestContent
  submitGameGuessRequestContent: {
    guess: "guess_example",
  },
};

apiInstance.submitGameGuess(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitGameGuessRequestContent** | **SubmitGameGuessRequestContent**|  |
 **gameId** | [**string**] |  | defaults to undefined


### Return type

**SubmitGameGuessResponseContent**

### Authorization

[smithy.api.httpApiKeyAuth](README.md#smithy.api.httpApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | SubmitGameGuess 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateUser**
> UpdateUserResponseContent updateUser(updateUserRequestContent)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DefaultApi(configuration);

let body:.DefaultApiUpdateUserRequest = {
  // string
  userId: "userId_example",
  // UpdateUserRequestContent
  updateUserRequestContent: {
    userName: "userName_example",
  },
};

apiInstance.updateUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateUserRequestContent** | **UpdateUserRequestContent**|  |
 **userId** | [**string**] |  | defaults to undefined


### Return type

**UpdateUserResponseContent**

### Authorization

[smithy.api.httpApiKeyAuth](README.md#smithy.api.httpApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | UpdateUser 200 response |  * Access-Control-Allow-Origin -  <br>  |
**400** | ValidationException 400 response |  * Access-Control-Allow-Origin -  <br>  |
**403** | AccessDeniedException 403 response |  * Access-Control-Allow-Origin -  <br>  |
**404** | ResourceNotFoundException 404 response |  * Access-Control-Allow-Origin -  <br>  |
**500** | InternalServerError 500 response |  * Access-Control-Allow-Origin -  <br>  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


