# E-Medical-System-Web-Project-Using-Spring-Boot-Security-JPA-Rest-Thymeleaf-HQL
Project on Bio-Medical &amp; Hospital sector which is covering various field of this 3 sector.This project is using Spring Framework, Hibernate, JPA, Rest, JSP also with (Post-Dev Data-Science, Big-data, ML etc. ) [ for Hackathon, CSI &amp; SIH]

# Youtube Link : https://youtu.be/bGM6xkhz0cU

[![Build Status](https://travis-ci.org/codecentric/springboot-sample-app.svg?branch=master)](https://travis-ci.org/codecentric/springboot-sample-app)
[![Coverage Status](https://coveralls.io/repos/github/codecentric/springboot-sample-app/badge.svg?branch=master)](https://coveralls.io/github/codecentric/springboot-sample-app?branch=master)
[![License](http://img.shields.io/:license-apache-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)


## Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `de.codecentric.springbootsample.Application` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

## Deploying the application to OpenShift

The easiest way to deploy the sample application to OpenShift is to use the [OpenShift CLI](https://docs.openshift.org/latest/cli_reference/index.html):

```shell
oc new-app codecentric/springboot-maven3-centos~https://github.com/codecentric/springboot-sample-app
```

This will create:

* An ImageStream called "springboot-maven3-centos"
* An ImageStream called "springboot-sample-app"
* A BuildConfig called "springboot-sample-app"
* DeploymentConfig called "springboot-sample-app"
* Service called "springboot-sample-app"

If you want to access the app from outside your OpenShift installation, you have to expose the springboot-sample-app service:

```shell
oc expose springboot-sample-app --hostname=www.example.com
```

<img src="./bioMedical/img/index.png" >
<img src="./bioMedical/img/1.png" >
<img src="./bioMedical/img/2.png" >
<img src="./bioMedical/img/3.png" >
<img src="./bioMedical/img/4.png" >
<img src="./bioMedical/img/5.png" >
<img src="./bioMedical/img/6.png" >
<img src="./bioMedical/img/7.png" >
<img src="./bioMedical/img/8.png" >
<img src="./bioMedical/img/9.png" >
<img src="./bioMedical/img/10.png" >
<img src="./bioMedical/img/11.png" >
<img src="./bioMedical/img/12.png" >
<img src="./bioMedical/img/13.png" >
<img src="./bioMedical/img/14.png" >
<img src="./bioMedical/img/15.png" >



## Copyright

Released under the Apache License 2.0. See the [LICENSE](https://github.com/codecentric/springboot-sample-app/blob/master/LICENSE) file.
