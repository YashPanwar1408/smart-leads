# API Response Examples

## Login Success
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6654d6b5e8c1c1a52a4e3c12",
      "name": "Sales User",
      "email": "sales@smartleads.io",
      "role": "sales",
      "createdAt": "2026-05-19T10:12:44.000Z",
      "updatedAt": "2026-05-19T10:12:44.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "meta": {
    "requestId": "a5d4c8a0-3b4f-4ec2-9d3a-8c6f1be78b2c"
  },
  "error": null
}
```

## Leads List Success
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "6654d6b5e8c1c1a52a4e3c20",
        "name": "Ariana West",
        "email": "ariana@example.com",
        "status": "New",
        "source": "Website",
        "ownerId": "6654d6b5e8c1c1a52a4e3c12",
        "createdAt": "2026-05-19T10:12:44.000Z",
        "updatedAt": "2026-05-19T10:12:44.000Z"
      }
    ]
  },
  "meta": {
    "requestId": "e2a7f8a0-9824-4d1a-b7f1-7b3f1df43c09",
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  },
  "error": null
}
```

## Validation Error
```json
{
  "success": false,
  "data": null,
  "meta": {
    "requestId": "2edb5831-4c19-4f6c-b88b-27f6d54bdb1b"
  },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "details": {
      "email": ["Invalid email"]
    }
  }
}
```
