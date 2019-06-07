# Crowdcodile


## Présentation

### Qui a fait le projet ?

La promotion Adaming Lille Mars / Juin 2019 Java / Cobol, merci à :
Remy, Noemie, Pierre, Antonin, Clément, Florian, Antoine, Florian, Yann, Antoine, Chadia, Romain, Celine, Camille et Taoufik.

### Qu’est-ce que c’est ?

C'est une application de crowdfunding. Elle permet de créer des groupes de financement participatif.
Cette application se démarque des autres car elle  met en lien des spécialistes des domaines des projets concernés.

### Quand avez vous bossé dessus ?

Le projet a démarré en Avril 2019 et sera fini début juin 2019.

### Où t’étais ? Que faisais-tu ?

Ce projet a été  mis en place dans le cadre de la formation Java / Cobol avec tous les apprenants de la promotion mars/juin.

### A quoi ça ressemble ?

C'est un site qui décrit des projets ayant besoin d'être financé. Les projets ont une photo / image, une descriptiondu projet (créateurs, catégorie, localisation, objectif du projet), le montant rassemblé, objectif du montant à atteindre et le nombre de participants.

### La progression…

L'application a été déployée grâce à Jhipster Heroku. Des parties sont en cours de création : la page d'accueil et les tests.
Les autorisations des différents login et l'architecture sont en cours de développement.

### Comment qu’on l’installe ?



## Introduction de Développement
Cette application a été générée avec JHipster 5.8.2, Vous pouvez trouver de la documentation et de l'aide au lien suivant : [https://www.jhipster.tech/documentation-archive/v5.8.2](https://www.jhipster.tech/documentation-archive/v5.8.2).

## Développement 

Avant de pouvoir créer ce projet, vous devez installer et configurer sur votre machine les dépendances suivantes :
1.  [Node.js][]: Nous utilisons Node pour faire fonctionner et construire un serveur web de développement.
	 Selon votre système, vous pouvez installer Node du fichier source ou par un lot de pre-package.

Pour installer les outils de développement, après l'installation de Node, vous devrez être capable de faire fonctionner les commandes suivantes.
Vous allez avoir besoin de faire fonctionner cette commande uniquement quand les dépendances changent dans le [package.json](package.json).

    npm install

Nous utilisons les scripts npm et [Webpack][] comme des constructeurs de système.

Utilisez les commandes suivantes dans deux terminaux séparés afin de créer une merveilleuse expérience de développement dans laquelle des mises-à-jour automatiques de votre navigateur se font au cours des modifications de document sur votre disque dur.

    ./mvnw
    npm start

Npm est aussi utilisé pour gérer les dépendances CSS et Javascript utilisées dans cette application. Vous pouvez actualiser les dépendances en spécifiant une version plus récente dans [package.json](package.json). Vous pouvez aussi utiliser  `npm update` et`npm install` pour gérer les dépendances.

Afin de voir les différentes utilisations possibles de chaque commande ajoutez la banderole `help`. Par exemple,  `npm help update`.

La commande  `npm run` listera tous les scripts disponibles à utiliser pour ce projet.

### Services workers

Les services workers sont commentés par défaut, veuillez enlever les balises de commentaire du code suivant  afin de les activer.

-   Le script de service worker enregistre dans index.html

```html
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(function() {
            console.log('Service Worker Registered');
        });
    }
</script>
```
A noter : les workbox créent les services workers respectifs et génèrent de façon dynamique le `service-worker.js`.

### La gestion des dépendances

Pour ajouter, par exemple, la librairie[Leaflet][] en tant que dépendance runtime de votre application vous devez inscrire les commandes suivantes:

    npm install --save --save-exact leaflet

Pour profiter pleinement des types de définition TypeScript du répertoire de [DefinitelyTyped][] en développement inscrivez les commandes suivantes :

    npm install --save-dev --save-exact @types/leaflet

Ensuite vous devez importer les documents  JS et CSS spécifiés dans les instructions des librairies d'installation afin que le [Webpack][]  ait connaissance d'eux:
Edit [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/css/vendor.css](src/main/webapp/content/css/vendor.css) file:

```
@import '~leaflet/dist/leaflet.css';
```

A noter :Quelques autres choses  sont toujours à faire pour Leaflet  mais nous ne mes détaillerons pas ici.

Pour des instructions supplémentaires sur le développement avec JHipster, regardez [Using JHipster in development][].


### Utiliser angular-cli

Vous pouvez aussi utiliser [Angular CLI][] pour générer des codes client  d'usage.

Par exemple, les commandes suivantes :

    ng generate component my-component

vont générer quelques fichiers :

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts

## Construire pour la production

Afin d'optimiser l'application Crowdcodile pour la production, inscrivez :

    ./mvnw -Pprod clean package

Cela concaténera  et minimisera les clients CSS et les documents JavaScript. Cela modifiera aussi `index.html` donc cela référencera ces nouveaux fichiers.
Afin d'assurer le bon fonctionnement de tout cela, utilisez :

    java -jar target/*.war

Ensuite allez sur [http://localhost:8081](http://localhost:8081) dans votre navigateur.

Pour plus de détail, référez vous à [Using JHipster in production][].

## Les test

Pour lancer votre test de l'application, inscrivez :

    ./mvnw clean test

### Les tests client

Les tests unitaires sont lancés par   [Jest][] et écris grâce à [Jasmine][].
Ils sont situés dans [src/test/javascript/](src/test/javascript/) et l'on peut les faire fonctionner grâce à :

    npm test

Pour plus d'informations référez vous aux [Running tests page][].

### La qualité du code

Sonar est utilisé pour analyser la qualité du code. Vous pouvez démarrer un serveur Sonar  local (accessible sur http://localhost:9001) avec:
```
docker-compose -f src/main/docker/sonar.yml up -d
```

Ensuite faites une analyse Sonar :
```
./mvnw -Pprod clean test sonar:sonar
```

Pour plus d'informations :[Code quality page][].

## Utilisez Docker pour simplifiez le développement (optionnel)

Vous pouvez utiliser Docker afin d'améliorer votre expérience de développement JHipster. Un nombre de configuration de composant de docker est disponible dans le dossier [src/main/docker](src/main/docker) afin de démarrer les services de third party.

Par exemple, pour démarrer une base de données postgresql dans un conteneur docker, utilisez :

    docker-compose -f src/main/docker/postgresql.yml up -d

Pour l'arrêter et enlever le conteneur, utilisez :

    docker-compose -f src/main/docker/postgresql.yml down

Vous pouvez aussi dockeriser complètement votre application et tous les services dont il dépend.
Pour accomplir cela, en premier construisez un docker image de votre application en utilisant :

    ./mvnw package -Pprod verify jib:dockerBuild

Ensuite utilisez :

    docker-compose -f src/main/docker/app.yml up -d

Pour plus d'information référez vous à [Using Docker and Docker-Compose][], cette page contient aussi des infos sur les composants du sub-générateur du docker  (`jhipster docker-compose`),  celui-ci est capable de généré des configurations docker pour une ou plusieurs applications JHipster.


## Intégration Continue (optionnel)

Utilisez le ci-cd sub-générateur (`jhipster ci-cd`), pour configurer le CI de votre projet, cela vous laissera générer les documents de configuration pour un nombre de systèmes d'intégration continue. Pour plus d'informations consultez :[Setting up Continuous Integration][].


[jhipster page d'accueil et dernière documentation]: https://www.jhipster.tech
[jhipster 5.8.2 archive]: https://www.jhipster.tech/documentation-archive/v5.8.2
[utiliser jhipster en développement]: https://www.jhipster.tech/documentation-archive/v5.8.2/development/
[utiliser docker et docker-compose]: https://www.jhipster.tech/documentation-archive/v5.8.2/docker-compose
[utiliser jhipster en production]: https://www.jhipster.tech/documentation-archive/v5.8.2/production/
[faire des pages de tests ]: https://www.jhipster.tech/documentation-archive/v5.8.2/running-tests/
[Qualité du code ]: https://www.jhipster.tech/documentation-archive/v5.8.2/code-quality/
[Mettre en place la configuration continue]: https://www.jhipster.tech/documentation-archive/v5.8.2/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: http://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: http://leafletjs.com/
[definitelytyped]: http://definitelytyped.org/