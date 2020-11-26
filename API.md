#   Chronosymple API

Ceci est la documentation de l API de chronosymple. Elle est utilisé pour le site web ainsi que l application mobile.
Elle est divisé en 4 grandes parties : Sessions, Admins, Patients, Doctors

## Sessions
La partie sessions permet aux utilisateurs de l Api de se connecter et de se déconnecter.

<br/><br/>


#### Login
 Cette route permet de se connecter à l api de chronosymple, elle retournera un
 **Login-Token** qui devra être utiliser pour toutes requêtes à l api.
##### requête
 +  **POST  https://docapp-prod.herokuapp.com/api/login**
 + **Header:**
 	+ Content-Type:  application/json
 + exemple de body:
```json
{
  "email": "swager_patient@gmail.com",
  "password": "swager75"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + bad **password** or **email**: **401**
+ exemple de body:
```json
{
  "login_token": "xtnpOAikCEPfawJQV_1eXOVlTUwOUCqJbxocXcoys1Q"
}
```

---

#### Logout
Cette route permet de se déconnecter de l'api
##### requête
 + **POST https://docapp-prod.herokuapp.com/api/logout**
 + **Header:**
 	+ Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**

---

#### Email confirmation
 Cette route permet de réaliser une confirmation de compte patient par mail
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patient_email_confirm**

+ **Header:**
	+ Content-Type: application/json
	+ Authorization: **Login-Token**

+ exemple de body:
```json
{
    "email": "swager_patient@gmail.com",
    "password": "swager75"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body:
```json
{
  "confirmation_token": "xtnpOA"
}
```

---

<br/><br/>
<a name="a"></a>

## Admins
La partie admin permet d effectuer toutes les taches d administration possible, les routes d'admin sont séparées en 4 parties: doctors, patients, notes et general units.

<br/><br/>

### Doctors

#### Listing
Cette route permet de récupérer la liste des médecins inscrit sur chronosymple
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/admin/doctors/list**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**
+ exemple de body:
```json
[
  {
    "id": "1",
    "first_name": "doc1",
    "last_name": "doc1",
    "email": "doc1@gmail.com",
    "phone_number": "012309123",
    "civility": "mme",
    "birthdate": "01/01/1968"
  },
    {
    "id": "2",
    "first_name": "doc2",
    "last_name": "doc2",
    "email": "doc2@gmail.com",
    "phone_number": "012768193",
    "civility": "mr",
    "birthdate": "02/05/1988"
  }
]
```

---

#### Update
Cette route permet de changer les informations de profile d'un docteur
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/doctors/{doctor_id}**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "first_name": "docdoc",
  "last_name": "docdoc",
  "phone_number": "09088193"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**
  + doctor with the **id** sent, not found: **404**
+ exemple de body: (with no error)
```json
{
  "id": "2",
  "first_name": "docdoc",
  "last_name": "docdoc",
  "phone_number": "09088193",
  "email": "doc2@gmail.com",
  "phone_number": "012768193",
  "civility": "mr",
  "birthdate": "02/05/1988",
  "picture": "..."
}
```

---

#### Delete
Cette route permet de supprimer le compte d'un docteur sur chronosymple
##### requête
+ **DELETE https://docapp-prod.herokuapp.com/api/admin/doctors/{doctor_id}/delete**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + doctor with the **id** sent, not found: **404**

---

#### Create
Cette route permet de créer le compte d'un docteur sur chronosymple
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/doctors/create**
+  **Header:**
    +  Authorization: **Login-Token**
    +  Content-Type: application/json
+ exemple de body:
```json
{
    "first_name": "doc",
    "last_name": "docdoc",
    "email": "docdoc@gmail.com",
    "phone_number": "0109321301",
    "password": "imdocdoc",
    "birthdate": "28/07/1975",
    "civility": "Mr",
    "picture": "",
    "address": "01 rue de laville, paris 75002",
    "default_units": "[1, 2]"
}
```

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + doctor couldn't be created: **403**
+ exemple de body:
```json
{
    "first_name": "doc",
    "last_name": "docdoc",
    "email": "docdoc@gmail.com",
    "phone_number": "0109321301",
    "password": "imdocdoc",
    "birthdate": "28/07/1975",
    "civility": "Mr",
    "picture": "",
    "address": "01 rue de laville, paris 75002",
    "default_units": "[1, 2]"
}
```

---

#### Add unit
Cette route permet d'ajouter une unit au docteur
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/doctors/{doctor_id}/add_unit**
+  **Header:**
    +   Authorization: **Login-Token**
    +   Content-Type: application/json
+ example de body:
```json
{
    "unit_id": "1"
}
```

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + doctor not found / unit not found: **404**
  + unit already added: **403**

---

#### Remove unit
Cette route permet de supprimer une unit du docteur
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/doctors/{doctor_id}/remove_unit**
+  **Header:**
    +   Authorization: **Login-Token**
    +   Content-Type: application/json
+ example de body:
```json
{
    "unit_id": "1"
}
```

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + doctor not found / unit not found: **404**

---

#### List unit
Cette route permet de récupérer les units d'un docteur
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/admin/doctors/{doctor_id}/units**
+  **Header:**
    +   Authorization: **Login-Token**

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + doctor not found: **404**
+ example de body:
```json
[ 
    {
        "id": "1",
        "name": "Diabètes"
    }
]
```


---
### Patients
#### Listing
Cette route permet de récupérer la liste des patients inscrit sur chronosymple
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/admin/patients**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**
+ exemple de body:
```json
[
  {
    "id": "1",
    "first_name": "p1",
    "last_name": "p1",
    "email": "p1@gmail.com",
    "phone_number": "012309123",
    "civility": "mme",
    "birthdate": "01/01/1968"
  },
    {
    "id": "2",
    "first_name": "p2",
    "last_name": "p2",
    "email": "p2@gmail.com",
    "phone_number": "012768193",
    "civility": "mr",
    "birthdate": "02/05/1988"
  }
]
```

---

#### Update
Cette route permet de changer les informations de profile d'un patient
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/patients/{patient_id}/update**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "first_name": "pp",
  "last_name": "pp",
  "phone_number": "09088193"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**
  + patient with the **id** sent, not found: **404**
+ exemple de body: (with no error)
```json
{
  "id": "2",
  "first_name": "pp",
  "last_name": "pp",
  "phone_number": "09088193",
  "email": "doc2@gmail.com",
  "phone_number": "012768193",
  "civility": "mr",
  "birthdate": "02/05/1988",
  "picture": "..."
}
```

---

#### Delete
Cette route permet de supprimer le compte d'un patient sur chronosymple
##### requête
+ **DELETE https://docapp-prod.herokuapp.com/api/admin/patients/{patient_id}/delete**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
```

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + patient with the **id** sent, not found: **404**

---

#### List unit
Cette route permet de récupérer les units d'un patient
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/admin/patients/{patient_id}/units**
+  **Header:**
    +   Authorization: **Login-Token**

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + patient not found: **404**
+ example de body:
```json
[ 
    {
        "id": "1",
        "general_units": {
            "id": "1",
            "name": "Diabètes"
        }
    }
]
```
---

#### Add unit
Cette route permet d'ajouter une unit au patient
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/patients/{patient_id}/add_unit**
+  **Header:**
    +   Authorization: **Login-Token**
    +   Content-Type: application/json
+ example de body:
```json
{
    "unit_id": "1"
}
```

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + patient not found / unit not found: **404**
  + unit already added: **403**

---

#### Remove unit
Cette route permet de supprimer une unit du patient
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/patients/{patient_id}/remove_unit**
+  **Header:**
    +   Authorization: **Login-Token**
    +   Content-Type: application/json
+ example de body:
```json
{
    "unit_id": "1"
}
```

##### réponse
+ **status code**:
  + no error: **200**
  + user isn't an admin: **401**
  + patient not found / unit not found: **404**

---


### Notes
#### Update
Cette route permet de changer une note d'un patient
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/admin/notes/{note id}**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "unit_id": "1",
  "data": "{...}"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**
  + notes couldn't get updated: **422**

---

#### Create
cette route permet de créer une note
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/admin/notes**
+ **Hearder:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "unit_id": "1",
  "data": "{...}"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**
  + note couldn't get created: **422**

---

### General units
#### Listing
Cette route permet de lister les generals units
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/admin/general_units**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json

{
  "modules": [
    {
      "id": 1,
      "name": "diabetes",
      "icon": "to be defined",
      "color": "blue"
    },
    {
      "id": 2,
      "name": "asthma",
      "icon": "to be defined",
      "color": "red"
    },
    {
      "id": 3,
      "name": "arthritis",
      "icon": "to be defined",
      "color": "green"
    }
  ]
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + user isn't an admin: **401**

---

<br/><br/>
<a name="p"></a>

## Patients

La partie patient regroupe toutes les routes utilisées par l'application mobile.
Les routes patients sont séparées en 6 parties: patients, profiles, général_units, units, doctors, notes.

<br/><br/>


### Patients
#### Signin
Cette route permet de se créer un compte patient chez chronosymple
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patients/signin**
+ **Header:**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "first_name": "kek",
  "last_name": "plop",
  "password": "magicintheair",
  "phone_number": "6969696969",
  "email": "kekplop@gmail.com",
  "civility": "mr",
  "birthdate": "02/07/1995"
}
```

##### réponse
+ **status code:**
  + no error: **201**
  + account already exist or wrong parameters: **422**
+ exemple de body: (with no error)
```json
{
  "login_token": "xtnpOAikCEPfawJQV_1eXOVlTUwOUCqJbxocXcoys1Q"
}
```

---

### Profiles
#### Profile info
Cette route permet de récupérer ses informations de profile
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/profiles**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + always: **200**
+ exemple de body:
```json
{
  "first_name": "kek",
  "last_name": "plop",
  "phone_number": "6969696969",
  "email": "kekplop@gmail.com",
  "civility": "mr",
  "birthdate": "02/07/1995",
  "picture": "..."
}
```

---

#### Update info
Cette route permet de changer ses informations de profile
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patients/profiles/update**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "first_name": "kekistan",
  "password": "magicintheair"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + wrong **password**: **403**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "first_name": "kekistan",
  "last_name": "plop",
  "phone_number": "6969696969",
  "email": "kekplop@gmail.com",
  "civility": "mr",
  "birthdate": "02/07/1995",
  "picture": "..."
}
```

---

#### Update password
Cette route permet de changer son mot de passe
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patients/profiles/change_password**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "old_password": "magicintheair",
  "new_password": "lmaosobadlol"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + wrong **old_password** or **new_password**: **403**
  + not logged in: **401**

---

#### Check password
Cette route permet de vérifier son mot de passe
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patients/profiles/check_password**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "password": "lmaosobadlol"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + wrong **password**: **403**
  + not logged in: **401**

---

### General_units
#### Listing
Cette route permet de lister les différentes général units ajoutable par le patient
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/general_units**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "modules": [
    {
      "id": 1,
      "name": "diabetes",
      "icon": "to be defined",
      "color": "blue"
    },
    {
      "id": 2,
      "name": "asthma",
      "icon": "to be defined",
      "color": "red"
    },
    {
      "id": 3,
      "name": "arthritis",
      "icon": "to be defined",
      "color": "green"
    }
  ]
}
```

---

#### Add unit
Cette route permet à l'utilisateur de rajouter la général unit voulu
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/patients/general_units/{general unit id}/add**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + general unit doesn't exist: **422**
  + not logged in: **401**

---

#### Info
Cette route permet de récupérer les informations de la général unit
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/general_units/{general unit id}/info**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + general unit doesn't exist: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "id": "1",
  "name": "diabetes",
  "icon": "to be defined",
  "color": "blue",
  "filter": {
    "only": [
      "Glycemie",
      "Glucide",
      "InsulineAvRepas",
      "InsulineApRepas",
      "InsulineAJeun",
      "date",
      "heure"
    ]
  }
}
```

---

#### Doctor listing by general unit
Cette route permet de lister les docteurs par general unit
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/general_units/{general unit id}/doctors**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **general unit** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "id": 7,
    "user": {
      "first_name": "doctor",
      "last_name": "doctor"
    }
  },
  {
    "id": 8,
    "user": {
      "first_name": "doctor_1",
      "last_name": "doctor_1"
    }
  },
  {
    "id": 9,
    "user": {
      "first_name": "doctor_2",
      "last_name": "doctor_2"
    }
  }
]
```

---


### Units
#### Add doctor
Cette route permet d'ajouter un docteur sur une unit
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/add_doctor**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "doctor_id": "1"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** or **doctor** not found: **404**
  + not logged in: **401**

---

#### Remove doctor
Cette route permet d'enlever un docteur sur une unit
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/remove_doctor**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "doctor_id": "1"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** or **doctor** not found: **404**
  + not logged in: **401**

---

#### Notes
cette route permet de récupérer toutes les notes d'une unit
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/notes**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
{
  "id": "1",
  "data": "{...}"
},
{
  "id": "2",
  "data": "{...}"
}
]
```

---

#### Add note
Cette route permet d'ajouter une note sur une unit
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/add_note**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "data": "{...}"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** not found or note couldn't get added: **404**
  + not logged in: **401**

---

#### Remove unit
Cette route permet d'enlever une unit
##### requête
+ **DELETE https://docapp-prod.herokuapp.com/api/patients/units/{unit id}**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** not found: **404**
  + not logged in: **401**

---

#### Listing
Cette route permet de lister les units avec les informations suivantes: l'info sur la général unit, les doctors ajoutés dessus.
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/units**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with not error)
```json
[
  {
    "id": 1,
    "general_unit": {
      "id": 1,
      "name": "diabetes",
      "icon": "to be defined",
      "color": "blue",
      "filter": {
        "only": [
          "Glycemie",
          "Glucide",
          "InsulineAvRepas",
          "InsulineApRepas",
          "InsulineAJeun",
          "date",
          "heure"
        ]
      }
    },
    "doctors": [
      {
        "full_name": "doctor doctor"
      },
      {
        "full_name": "doctor_3 doctor_3"
      },
      {
        "full_name": "doctor_2 doctor_2"
      },
      {
        "full_name": "doctor_1 doctor_1"
      }
    ]
  }
]
```

---

#### Change filter
Cette route permet de changer le filtre d'une unit
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/change_filter**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "filter": {}
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + bad filter: **422**
  + not logged in: **401**

---

#### Share notes
cette route permet de partager une note avec un docteur
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/share_notes**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-type: application/json
exemple de body:
```json
{
  "doctor_ids": [ 1, 2, 3],
  "note_ids": [ 2, 3, 7, 91]
}
```
##### réponse
+ **status code:**
  + no error: **200**
  + **unit** not found: **404**
  + not logged in: **401**

---

### Doctor listing on patient unit
Cette route permet de récupérer la liste des docteurs ajoutés sur l'unit de l'utilisateur
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/units/{unit id}/doctors**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "id": "1",
    "user": {
      "first_name": "kek",
      "last_name": "plop"
    }
  },
  {
    "id": "2",
    "user": {
      "first_name": "doc2",
      "last_name": "doc2"
    }
  }
]
```

---

### Doctors
#### General listing of doctors
Cette route permet de lister tous les docteurs
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/doctors**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (no error)
```json
[
  {
    "id": "1",
    "user": {
      "first_name": "kekistan",
      "last_name": "plop",
      "phone_number": "6969696969",
      "email": "kekplop@gmail.com",
      "civility": "mr",
      "birthdate": "02/07/1995"
    },
    "general_units": [
      {
        "id": "1",
        "name": "diabète"
      }
    ]
  }
]
```

----

#### Listing own doctors
Cette route permet de lister ses docteurs
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/doctors/my_doctors**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "id": 1,
    "general_unit": {
      "id": 1,
      "name": "diabetes"
    },
    "doctors": [
      {
        "id": 7,
        "user": {
          "first_name": "doctor",
          "last_name": "doctor",
          "email": "doctor@gmail.com"
        }
      },
      {
        "id": 10,
        "user": {
          "first_name": "doctor_3",
          "last_name": "doctor_3",
          "email": "doctor_3@gmail.com"
        }
      }
    ]
  }
]
```

---

#### Doctor profile info
Cette route permet de récupérer les informations de profile du docteur en tant que patient
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/doctors/profile?id={doctor id}**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **doctor** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "first_name": "doctor",
  "last_name": "doctor",
  "email": "doctor@gmail.com",
  "phone_number": "00918989",
  "picture": ""
}
```

---

### Notes
#### Destroy
Cette route permet de détruire une note
##### requête
+ **DELETE https://docapp-prod.herokuapp.com/api/patients/notes/{id note}**
+ **Header:**
  + Authorization; **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **note** not found: **404**
  + not logged in: **401**

---

#### Update
Cette route permet de changer une note
##### requête
+ **PUT https://docapp-prod.herokuapp.com/api/patients/notes/{id note}**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "data": "{ ... }"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + **note** not found: **404**
  + not logged in: **401**

---

#### Notes by date interval
Cette route permet de récupérer les notes par interval de temps
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/notes/notes_by_interval?begin_date={begin date}&end_date={end date}**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + missing parameters: **422**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
  {
    "unit_id": "1",
    "data": "{...}",
    "created_at": "01/08/1998",
    "updated_at": "02/08/1998"
  }
```

---

#### Unshare note with doctor
Cette route permet d'arréter le partage de notes avec un ou plusieurs docteurs
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/patients/notes/{id note}/unshare**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "doctor_ids": [ 1, 2, 3]
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "note_id": "1"
}
```

---

#### Doctors listing by note
Cette route permet de lister les docteurs avec qui la note a été partagé
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/patients/notes/{id note}/doctors**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **note** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "id": "1",
    "user": {
      "first_name": "doc",
      "last_name": "doc",
      "email": "doc@gmail.com"
    }
  }
]
```

---

<br/><br/>
<a name="d"></a>

 ## Doctors

La partie doctor regroupe toutes les routes du site web.
Les routes docteurs sont séparées en 6 parties: doctor, general_unit, unit, profile, patient, note

<br/><br/>

### Doctor
#### Sign in
Cette route permet à un docteur de créer un compte chez chronosymple
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/doctors/signin**
+ **Header:**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "first_name": "kek",
  "last_name": "plop",
  "password": "magicintheair",
  "phone_number": "6969696969",
  "email": "kekplop@gmail.com",
  "civility": "mr",
  "birthdate": "02/07/1995",
  "default_units": [1, 2, 3]
}
```

##### réponse
+ **status code:**
  + no error: **201**
  + couldn't create the doctor: **422**
  + no default unit: **400**
+ exemple de body: (with no error)
```json
{
  "login_token": "ERjqzZnRzkaZq4Bb173sny9UijamLwhfnVO7yekjryo"
}
```

---

### General unit
#### Listing
Cette route permet de lister les différentes général units ajoutable par le patient
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/general_units**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "modules": [
    {
      "id": 1,
      "name": "diabetes",
      "icon": "to be defined",
      "color": "blue"
    },
    {
      "id": 2,
      "name": "asthma",
      "icon": "to be defined",
      "color": "red"
    },
    {
      "id": 3,
      "name": "arthritis",
      "icon": "to be defined",
      "color": "green"
    }
  ]
}
```

---

#### Info
Cette route permet de récupérer les informations de la général unit
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/general_units/{general unit id}/info**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + general unit doesn't exist: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "id": "1",
  "name": "diabetes",
  "icon": "to be defined",
  "color": "blue",
  "filter": {
    "only": [
      "Glycemie",
      "Glucide",
      "InsulineAvRepas",
      "InsulineApRepas",
      "InsulineAJeun",
      "date",
      "heure"
    ]
  }
}
```

---

#### Add general unit
Cette route permet d'ajouter une general unit à son compte docteur
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/doctors/general_units/{general unit id}/add**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** doesn't exist or coudln't get added: **422**
  + not logged in: **401**

---

#### Remove general unit
Cette route permet d'enlever une general unit de son compte
##### requête
+ **PATCH https://docapp-prod.herokuapp.com/api/doctors/general_units/{general unit id}/remove**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json

##### réponse
+ **status code:**
  + no error: **200**
  + **unit** doesn't exist or coudln't get added: **422**
  + not logged in: **401**

---

### Profile
#### Profile info
Cette route permet de récupérer ses informations de profile
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/profiles**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + always: **200**
+ exemple de body:
```json
{
  "first_name": "kek",
  "last_name": "plop",
  "phone_number": "6969696969",
  "email": "kekplop@gmail.com",
  "civility": "mr",
  "birthdate": "02/07/1995",
  "picture": "..."
}
```

---

#### Update info
Cette route permet de changer ses informations de profile
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/doctors/profiles/update**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "first_name": "kekistan",
  "password": "magicintheair"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + wrong **password**: **403**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "first_name": "kekistan",
  "last_name": "plop",
  "phone_number": "6969696969",
  "email": "kekplop@gmail.com",
  "civility": "mr",
  "birthdate": "02/07/1995",
  "picture": "..."
}
```

---

#### Update password
Cette route permet de changer son mot de passe
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/doctors/profiles/change_password**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "old_password": "magicintheair",
  "new_password": "lmaosobadlol"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + wrong **old_password** or **new_password**: **403**
  + not logged in: **401**

---

#### Check password
Cette route permet de vérifier son mot de passe
##### requête
+ **POST https://docapp-prod.herokuapp.com/api/doctors/profiles/check_password**
+ **Header:**
  + Authorization: **Login-Token**
  + Content-Type: application/json
+ exemple de body:
```json
{
  "password": "lmaosobadlol"
}
```

##### réponse
+ **status code:**
  + no error: **200**
  + wrong **password**: **403**
  + not logged in: **401**

---

### Patient
#### Profile
Cette route permet de récupérer les informations de profile d'un patient
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/patients/{patient id}/profile**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **patient** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
{
  "first_name": "swager_patient",
  "last_name": "swager_patient",
  "email": "swager_patient@gmail.com",
  "phone_number": "00918989",
  "birthdate": "25/05/1998",
  "civility": "Mr",
  "picture": ""
}
```

---

#### Listing patient units
Cette route permet de lister les units que possède un patient
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/patients/{patient id}/units**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + **patient** not found: **404**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "id": "1"
  },
  {
    "id": "2"
  }
]
```

---

#### Listing units
Cette route permet de lister les units auxquel le docteur a accès
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/patients**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "id": 1,
    "patient_id": 2,
    "general_unit": {
      "id": 1,
      "name": "diabetes"
    }
  },
  {
    "id": 2,
    "patient_id": 3,
    "general_unit": {
      "id": 1,
      "name": "diabetes"
    }
  }
]
```

---

### Note
#### Listing global des notes
Cette route permet de récupérer toutes les notes dont le docteur a accès
##### requête
+ **GET https://docapp-prod.herokuapp.com/api/doctors/notes**
+ **Header:**
  + Authorization: **Login-Token**

##### réponse
+ **status code:**
  + no error: **200**
  + not logged in: **401**
+ exemple de body: (with no error)
```json
[
  {
    "unit_id": "1",
    "data": "{...}",
    "created_at": "01/08/1998",
    "updated_at": "02/08/1998"
  }
]
```

---
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjc2NDgyODY0LDc1NDMwMTc0MF19
-->