# GuestbookControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**create**](GuestbookControllerApi.md#create) | **POST** /guestbook/ |  |



## create

> CreateGuestbookMessageResponse create(createGuestbookMessageRequest)



### Example

```ts
import {
  Configuration,
  GuestbookControllerApi,
} from '@blogzio/api';
import type { CreateRequest } from '@blogzio/api';

async function example() {
  console.log("🚀 Testing @blogzio/api SDK...");
  const api = new GuestbookControllerApi();

  const body = {
    // CreateGuestbookMessageRequest
    createGuestbookMessageRequest: ...,
  } satisfies CreateRequest;

  try {
    const data = await api.create(body);
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
| **createGuestbookMessageRequest** | [CreateGuestbookMessageRequest](CreateGuestbookMessageRequest.md) |  | |

### Return type

[**CreateGuestbookMessageResponse**](CreateGuestbookMessageResponse.md)

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

