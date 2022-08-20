# Planning Center Online for Node.js

A Node.js library for the planningcenteronline.com API.

## Basic usage

Make a client instance with your Personal Access Token:
```javascript
let opts = {
    applicationId: 'xxxxx',
    secret: 'xxxxx'
};
let client = new PlanningCenterClient(opts);
```

Or using an OAuth Access Token:
```javascript
let opts = {
    accessToken: 'xxxxx'
};
let client = new PlanningCenterClient(opts);
```

Then make a command and send it:
```javascript
let command = new GetPersonCommand();
let result = client.send(command);
```

## Advanced usage

You can chain function calls to add URL parameters to the API call:
```javascript
let command = new GetPersonCommand()
    .queryByFirstName("John")
    .includeEmails()
    .orderByBirthdate();
let result = client.send(command);
```

The `queryByXXXX`, `includeXXXX`, and `orderByXXXX` functions match the [Planning Center API docs](https://developer.planning.center/docs/#/overview). Just change the `snake_case` parameter names to `CamelCase` and prepend with either `queryBy`, `include`, or `orderBy`.

## Supported APIs

People (version 2022-01-28)
* Person: `/people/v2/people`
* Email: `/people/v2/emails`
