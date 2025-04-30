# 3PROJ BACKEND API

## Prérequis
- NodeJS >= 23

## Lancement
Pour lancer l'API il faut d'abord configuré les variables d'environnements :

```.env```
```.env
PORT=3000
SOCKET_PORT=3001
JWT_TOKEN_SECRET=your_secret_key
```

Puis lancer le serveur
```shell
npm run dev
```

## ENDPOINTS HTTP

### Users
__POST__
```/users/register```

Payload :

```JSON
{
    headers: {
        "Content-Type": "multipart/form-data",
        // Pas besoin de token
    },
    body: {
        "email": "test@test.xyz",
        "username": "JohnDoe",
        "password": "changeme",
        "profile_pic": file
    }
}
```

Reponse : ```HTTP Code 201```





__POST__ ```/users/login```

Payload:
```JSON
{
    headers: {
        "Content-Type": "application/json"
        // Pas besoin de token
    },
    body: {
        "email": "test@test.xyz",
        "password": "changeme"
    }
}
```

Reponse :
```JSON
// RESPONSE CODE 200
{
    "token": "your_token"
}
```
```JSON
//RESPONSE CODE 401
{
    "message": "Invalid Credentials"
}
```





__GET__ ```/users/:id```

Payload :
```JSON
{
    headers: {
        "Authorization": "Bearer your_token"
    }
}
```

Response :
```JSON
{
    // RESPONSE CODE 200
    "id": 1,
    "email": "test@test.xyz",
    "username": "JohnDoe",
}
```




__GET__ ```/users/:id/workspaces```

Payload:
```JSON
{
    headers: {
        "Authorization": "Bearer your_token"
    }
}
```

Response :
```JSON
// REPONSE CODE 200
[
    {
        "id": 1,
        "title": "Supinfo"
    },
    {
        "id": 1,
        "title": "Axelerance"
    }
]
```



__GET__ ```/users/:id/profile_picture```

Payload :
```JSON
{
    headers: {
        "Authorization": "Bearer your_token"
    }
}
```

Response :
```JSON
// RESPONSE CODE 200
{
    "profile_pic": "1746004637707-IMG_0190.jpg"
}
```


## Websocket Events

Les websockets sont accessible via des events (mot-clé), ils fonctionnent avec 'room' (vous devez vous connectez a une room pour accèdé a un channel/MP...). Les events servant a envoyé des données demande le token de l'utilisateur.

```joinRoom```
Cet event sert a rejoindre une room (pour les MP les noms sont toujours idleplusbas-idleplushaut ex: 13-123 serait la room des MP entre l'utilisateur 13 et 123 peu importe que le client soit 13 ou 123)

```private_message``` 
Cet event permet d'envoyer un message dans la room a laquelle vous êtes **actuellement connecté**. Vous devez renseignez un token pour envoyer des données sur cet endpoint.

Payload :
```JSON
{
    "token": "your_token",
    "content": {
        "message": "Lorem Ipsum",
        "attachment": file
    }
}
```

```message```
Cet event vous permet de récupérer les messages envoyés dans la room a laquelle vous êtes **actuellement connecté**. **ATTENTION** cet event renvoie aussi les messages que VOUS envoyé et c'est de la que vous devez les récupérer pour les affichés !!!