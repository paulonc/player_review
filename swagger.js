{
    "openapi": "3.0.0",
    "info": {
      "title": "Player Review API",
      "version": "1.0.0",
      "description": "API documentation for the Player Review application"
    },
    "servers": [
      {
        "url": "http://localhost:3000"
      }
    ],
    "paths": {
      "/users": {
        "get": {
          "summary": "Retrieve a list of all users",
          "responses": {
            "200": {
              "description": "A list of all users",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Create a new user",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "/users/{id}": {
        "get": {
          "summary": "Retrieve user data by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The user information",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "404": {
              "description": "User with id not found"
            }
          }
        },
        "put": {
          "summary": "Update user's data by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated user data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "404": {
              "description": "User with id not found"
            }
          }
        },
        "delete": {
          "summary": "Delete user by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "User deleted"
            },
            "404": {
              "description": "User with id not found"
            }
          }
        },
        "patch": {
          "summary": "Change user password",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "oldPassword": {
                      "type": "string"
                    },
                    "newPassword": {
                      "type": "string"
                    }
                  },
                  "required": ["oldPassword", "newPassword"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password changed successfully"
            },
            "400": {
              "description": "Invalid password"
            },
            "404": {
              "description": "User with id not found"
            }
          }
        }
      },
      "/games": {
        "get": {
          "summary": "Retrieve a list of all games",
          "responses": {
            "200": {
              "description": "A list of all games",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Game"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Create a new game",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Game"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The created game",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Game"
                  }
                }
              }
            }
          }
        }
      },
      "/games/{id}": {
        "get": {
          "summary": "Retrieve game data by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The game data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Game"
                  }
                }
              }
            },
            "404": {
              "description": "Game with id not found"
            }
          }
        },
        "put": {
          "summary": "Update game data by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Game"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated game data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Game"
                  }
                }
              }
            },
            "404": {
              "description": "Game with id not found"
            }
          }
        },
        "patch": {
          "summary": "Update game release date by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "releaseDate": {
                      "type": "string",
                      "format": "date-time"
                    }
                  },
                  "required": ["releaseDate"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Release date updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Game"
                  }
                }
              }
            },
            "400": {
              "description": "Valid release date is required"
            },
            "404": {
              "description": "Game with id not found"
            }
          }
        },
        "delete": {
          "summary": "Delete game by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Game deleted"
            },
            "404": {
              "description": "Game with id not found"
            }
          }
        }
      },
      "/companies": {
        "get": {
          "summary": "Retrieve a list of all companies",
          "responses": {
            "200": {
              "description": "A list of all companies",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Company"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Create a new company",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "New company created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Company"
                  }
                }
              }
            }
          }
        }
      },
      "/companies/{id}": {
        "get": {
          "summary": "Retrieve company data by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Company data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Company"
                  }
                }
              }
            },
            "404": {
              "description": "Company not found"
            }
          }
        },
        "put": {
          "summary": "Update company data by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated company data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Company"
                  }
                }
              }
            },
            "404": {
              "description": "Company not found"
            }
          }
        },
        "delete": {
          "summary": "Delete company by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Company deleted"
            },
            "404": {
              "description": "Company not found"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "username": {
              "type": "string"
            },
            "email": {
              "type": "string",
              "format": "email"
            },
            "role": {
              "type": "string",
              "enum": ["USER", "ADMIN"]
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "Game": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "companyId": {
              "type": "string",
              "format": "uuid"
            },
            "releaseDate": {
              "type": "string",
              "format": "date-time"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "Company": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "name": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        }
      }
    }
  }