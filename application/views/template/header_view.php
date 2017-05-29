<!doctype>
<html ng-app="mainApp">
    <head>
        <title>Health Facilities Locator | Code For Tanzania</title>
        <link rel="shortcut icon" href="<?= site_url('img/favicon.ico'); ?>">
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/bootstrap.min.css')?>" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,800,700,600,300">
        <link href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre|Playfair+Display" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/ngDialog.css')?>" />
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/ngDialog-theme-default.css')?>" />
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/app.css')?>" />
    </head>

    <body ng-controller="healthFacilitiesController">
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="active navbar-brand" href="/"><img alt="logo" src="<?= site_url('img/logo.png'); ?>" class="cfn-logo"></a>
                <button type="button" class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse">
                <div class="top-navigation">
                    <ul class="nav navbar-nav">
                        <li role="presentation" class=""><a href="https://twitter.com/code4africa" target="_blank">WASILIANA</a></li>
                        <li role="presentation" class="">
                        <a href="#" ng-click="showEmbedCodes()">PACHIKA HII <i class="fa fa-caret-down" aria-hidden="true"></i></a>
                        </li>
                        <li role="presentation" class="navitem-divider"><a role="button" href="#"></a></li>
                        <li role="presentation" class="">
                        <a href=" https://facebook.com/CodeForAfrica" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        </li>
                        <li role="presentation" class=""><a href="https://twitter.com/code4africa" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                        </ul>
                </div>
            </div>
        </div>
    </nav>