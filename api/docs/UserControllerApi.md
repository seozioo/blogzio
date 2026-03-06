# UserControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**signup**](UserControllerApi.md#signup) | **POST** /user/signup |  |



## signup

> UserResponse signup(userRequest)



### Example

```ts
import {
  Configuration,
  UserControllerApi,
} from '@blogzio/api';
import type { SignupRequest } from '@blogzio/api';

async function example() {
  console.log("🚀 Testing @blogzio/api SDK...");
  const api = new UserControllerApi();

  const body = {
    // UserRequest
    userRequest: ...,
  } satisfies SignupRequest;

  try {
    const data = await api.signup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userRequest** | [UserRequest](UserRequest.md) |  | |

### Return type

[**UserResponse**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

