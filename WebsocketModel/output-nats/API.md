## Modules

<dl>
<dt><a href="#module_lightMeasured">lightMeasured</a></dt>
<dd><p>Module which wraps functionality for the <code>light/measured</code> channel</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#NatsAsyncApiClient">NatsAsyncApiClient</a></dt>
<dd><p>NatsAsyncApiClient</p>
<p>The generated client based on your AsyncAPI document.</p>
</dd>
<dt><a href="#NatsAsyncApiTestClient">NatsAsyncApiTestClient</a></dt>
<dd><p>NatsAsyncApiTestClient</p>
<p>The test/mirror client which is the reverse to the normal NatsAsyncApiClient.</p>
</dd>
</dl>

<a name="module_lightMeasured"></a>

## lightMeasured
Module which wraps functionality for the `light/measured` channel

<a name="module_lightMeasured..subscribe"></a>

### lightMeasured~subscribe(onDataCallback, nc, codec, options)
Internal functionality to setup subscription on the `light/measured` channel

**Kind**: inner method of [<code>lightMeasured</code>](#module_lightMeasured)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| nc | to subscribe with |
| codec | used to convert messages |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiClient"></a>

## NatsAsyncApiClient
NatsAsyncApiClient

The generated client based on your AsyncAPI document.

**Kind**: global class  

* [NatsAsyncApiClient](#NatsAsyncApiClient)
    * [.connect(options)](#NatsAsyncApiClient+connect)
    * [.disconnect()](#NatsAsyncApiClient+disconnect)
    * [.isClosed()](#NatsAsyncApiClient+isClosed)
    * [.connectWithUserCreds(userCreds, options)](#NatsAsyncApiClient+connectWithUserCreds)
    * [.connectWithUserPass(user, pass, options)](#NatsAsyncApiClient+connectWithUserPass)
    * [.connectToHost(host, options)](#NatsAsyncApiClient+connectToHost)
    * [.connectToMosquitto()](#NatsAsyncApiClient+connectToMosquitto)
    * [.subscribeToLightMeasured(onDataCallback, flush, options)](#NatsAsyncApiClient+subscribeToLightMeasured)

<a name="NatsAsyncApiClient+connect"></a>

### natsAsyncApiClient.connect(options)
Try to connect to the NATS server with the different payloads.

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| options | to use, payload is omitted if sat in the AsyncAPI document. |

<a name="NatsAsyncApiClient+disconnect"></a>

### natsAsyncApiClient.disconnect()
Disconnect all clients from the server

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  
<a name="NatsAsyncApiClient+isClosed"></a>

### natsAsyncApiClient.isClosed()
Returns whether or not any of the clients are closed

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  
<a name="NatsAsyncApiClient+connectWithUserCreds"></a>

### natsAsyncApiClient.connectWithUserCreds(userCreds, options)
Try to connect to the NATS server with user credentials

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| userCreds | to use |
| options | to connect with |

<a name="NatsAsyncApiClient+connectWithUserPass"></a>

### natsAsyncApiClient.connectWithUserPass(user, pass, options)
Try to connect to the NATS server with user and password

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| user | username to use |
| pass | password to use |
| options | to connect with |

<a name="NatsAsyncApiClient+connectToHost"></a>

### natsAsyncApiClient.connectToHost(host, options)
Try to connect to the NATS server which has no authentication

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| host | to connect to |
| options | to connect with |

<a name="NatsAsyncApiClient+connectToMosquitto"></a>

### natsAsyncApiClient.connectToMosquitto()
Connects the client to the AsyncAPI server called mosquitto.

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  
<a name="NatsAsyncApiClient+subscribeToLightMeasured"></a>

### natsAsyncApiClient.subscribeToLightMeasured(onDataCallback, flush, options)
Subscribe to the `light/measured`

null

**Kind**: instance method of [<code>NatsAsyncApiClient</code>](#NatsAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| flush | ensure client is force flushed after subscribing |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="NatsAsyncApiTestClient"></a>

## NatsAsyncApiTestClient
NatsAsyncApiTestClient

The test/mirror client which is the reverse to the normal NatsAsyncApiClient.

**Kind**: global class  

* [NatsAsyncApiTestClient](#NatsAsyncApiTestClient)
    * [.connect(options)](#NatsAsyncApiTestClient+connect)
    * [.disconnect()](#NatsAsyncApiTestClient+disconnect)
    * [.isClosed()](#NatsAsyncApiTestClient+isClosed)
    * [.connectWithUserCreds(userCreds, options)](#NatsAsyncApiTestClient+connectWithUserCreds)
    * [.connectWithUserPass(user, pass, options)](#NatsAsyncApiTestClient+connectWithUserPass)
    * [.connectToHost(host, options)](#NatsAsyncApiTestClient+connectToHost)
    * [.connectToMosquitto()](#NatsAsyncApiTestClient+connectToMosquitto)
    * [.publishToLightMeasured(message)](#NatsAsyncApiTestClient+publishToLightMeasured)

<a name="NatsAsyncApiTestClient+connect"></a>

### natsAsyncApiTestClient.connect(options)
Try to connect to the NATS server with the different payloads.

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| options | to use, payload is omitted if sat in the AsyncAPI document. |

<a name="NatsAsyncApiTestClient+disconnect"></a>

### natsAsyncApiTestClient.disconnect()
Disconnect all clients from the server

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  
<a name="NatsAsyncApiTestClient+isClosed"></a>

### natsAsyncApiTestClient.isClosed()
Returns whether or not any of the clients are closed

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  
<a name="NatsAsyncApiTestClient+connectWithUserCreds"></a>

### natsAsyncApiTestClient.connectWithUserCreds(userCreds, options)
Try to connect to the NATS server with user credentials

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| userCreds | to use |
| options | to connect with |

<a name="NatsAsyncApiTestClient+connectWithUserPass"></a>

### natsAsyncApiTestClient.connectWithUserPass(user, pass, options)
Try to connect to the NATS server with user and password

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| user | username to use |
| pass | password to use |
| options | to connect with |

<a name="NatsAsyncApiTestClient+connectToHost"></a>

### natsAsyncApiTestClient.connectToHost(host, options)
Try to connect to the NATS server which has no authentication

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| host | to connect to |
| options | to connect with |

<a name="NatsAsyncApiTestClient+connectToMosquitto"></a>

### natsAsyncApiTestClient.connectToMosquitto()
Connects the client to the AsyncAPI server called mosquitto.

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  
<a name="NatsAsyncApiTestClient+publishToLightMeasured"></a>

### natsAsyncApiTestClient.publishToLightMeasured(message)
Publish to the `light/measured` channel

null

**Kind**: instance method of [<code>NatsAsyncApiTestClient</code>](#NatsAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |

