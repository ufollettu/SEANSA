# Superactivator 2.0

Stai visualizzando la documentazione per la versione 2.0 di Superactivator, sistema di gestione delle licenze sviluppato da [GR srl](http://www.grsrl.net/)

### Prerequisites

è necessario avere [NodeJS e NPM](https://nodejs.org/it/) installati e funzionanti.
è necessario un database [MySQL](https://www.mysql.com) e l'accesso alle credenziali dello stesso

---

### Get and Install the App

Per scaricare l'app posizionarsi nella cartella di destinazione e da terminale eseguire il comando `git clone git@bitbucket.org:grsrlrd/superactivatorngnode.git`

l'app verrà scaricata. Una volta terminato il download, installare le dipendenze utilizzando il comando `npm install`
Completata l'installazione dei pacchetti è possibile configurare l'app per il successivo utilizzo 

---

### DB Init

Per poter avviare l'app è necessario fornire le credenziali per l'accesso al proprio DB nel file `.env` presente nella root dell'applicazione. è possiile impostare 3 diversi database, uno di sviluppo, uno di test, uno di produzione:

```javascript
APP=`enviroment`* 
PORT=3000

DB_DIALECT_DEV=mysql
DB_HOST_DEV=localhost
DB_PORT_DEV=3306
DB_NAME_DEV=`your_dev_db_name`
DB_USER_DEV=`your_dev_db_username`
DB_PASSWORD_DEV=`your_dev_db_password`

DB_DIALECT_TEST=mysql
DB_HOST_TEST=localhost
DB_PORT_TEST=3306
DB_NAME_TEST=`your_test_db_name`
DB_USER_TEST=`your_test_db_username`
DB_PASSWORD_TEST=`your_test_db_password`

DB_DIALECT_PROD=mysql
DB_HOST_PROD=`your_prod_db_host`
DB_PORT_PROD=`your_prod_db_port`
DB_NAME_PROD=`your_prod_db_name`
DB_USER_PROD=`your_prod_db_username`
DB_PASSWORD_PROD=`your_prod_db_password`

PORTAL_NAME=SuperActivator
SECRET=`your_secret_key`
JWT_ENCRYPTION=`your_jwt_encryption_key`
JWT_EXPIRATION=`your_token_expire_number`

MAIL_ADDRESS=`your_mail_address`
MAIL_PWD=`your_mail_password`

ADMINIDS=`admins numeric id separated by "|" es: 58|102`

*selezionare un'ambiente tra `dev` `test` e `prod`
```

### DB utility

l'app è provvista di file utili per creare un database di esempio per lo sviluppo e il testing. è possibile utilizzare i seguenti comandi per la gestione dei seeds:

|  Comando          | Descrizione                                                 | 
| ----------------- |-------------------------------------------------------------|
| `npm run dbinit`  | Crea le tabelle nel DB e le riempie con dati di esempio     |
| `npm run dbreset` | Resetta le tabelle nel DB e le riempie con dati di esempio  |
| `npm run dbreload`| Cancella e ricrea i dati di esempio nel DB                  |

---

### Run dev server

è possibile avviare il server sulla porta `3000` utilizzando il comando `npm start`

se si è installato [Nodemon](https://nodemon.io/), utilizzando il comando `nodemon` è possibile aviare il server in modalità "watch"

### Testing system core

è possibile lanciare i test verificare il corretto funzionamento del core di sistema attraverso il comando `npm run testserver`

---

### Run client 

Per avviare il client [Angular](https://angular.io/) utilizzare il comando `ng serve` che permette di avviare l'app in modalità "watch" sulla porta `4200`.

### Build Dist (production)

Per compilare una versione ottimizzata per la produzione utilizzare il comando `ng build --prod` i file creati saranno disponibili nella cartella `dist` nella root dell'app

---

## V2.0 Main Features

Superactivator 2.0 implementa un insieme di funzionalità per una gestione avanzata delle licenze e per la personalizzazione dell'interfaccia e dei livelli di accesso.
è previsto inoltre l'accesso multiutenza ed è supportata la navigazione da tablet   

### Customization

Il modello grafico del Superactivator si basa sul [Material Design](https://material.io/), e da la possibiltà di modificare lo schema di colori dell'intera app sceglienda tra temi predefiniti oppure impostando colori personalizzati. è possibile inoltre caricare un logo personalizzato.
La funzione di personalizzazione è reperibile nella tabella utenti

Ogni utente al momento della creazione ha impostato uno stile grafico e un logo di default predefiniti.

> NB: solo l'admin può modificare la grafica e il logo degli utenti.

### Levels of authorization

I livelli di autorizzazione previsti sono 9, e garantiscono l'accesso alle funzionalità dell'App solo ad utenti autorizzati. I permessi possono essere impostati dalla tabella utenti. La descrizione dei livelli è la seguente: 

| Value  | Description |
|:------:|-------------|
| 0 | Creazione nuovo utente 
| 1 | Reset password di qualsiasi utente |
| 2 | Eliminazione di qualsiasi utente |
| 3 | Modifica livello di qualsiasi utente| 
| 4 | Rinnovo delle licenze |
| 5 | Gestione completa delle licenze| 
| 6 | Gestione completa dei clienti |
| 7 | Gestione completa dei PC |
| 8 | Gestione matricole associate alle licenze LECU OEM|
| 9 | Gestione pacchetti|

Ogni utente al momento della creazione ha il livello 4 (rinnovo delle licenze) impostato come predefinito.

> NB: qualsiasi utente può avere tutti i livelli di permesso impostati, è necessaria cautela nell'assegnazione dei permessi

### Multiuser (and mailer)

Superactivator 2.0 permette l'utilizzo in multiutenza: i dati visualizzati da ciascun utente sono filtrati in base all'utente loggato. Ciò permette una maggiore tutela dei dati sensibili e la protezione di dati commerciali e personali

> NB: l'Admin può comunque visualizzare tutti i dati presenti sul database e interagire con essi in base ai permessi impostati

Per una migliore gestione del flusso di lavoro è prevista una funzione di mail delle licenze al momento della creazione della stessa o in qualsiasi momento dalla tabella sks. Allo stesso scopo è stato implementata la funzione di "forgot-password": se un utente ha smarrito la password può richiederla via mail all'Admin

