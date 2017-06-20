<!doctype>
<html ng-app="mainApp">
    <head>
        <title>Health Facilities Locator (Embed) | Code For Tanzania</title>
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/bootstrap.min.css')?>" />
        <link rel="shortcut icon" href="<?= site_url('img/favicon.ico'); ?>">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,800,700,600,300">
        <link href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre|Playfair+Display" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/ngDialog.css')?>" />
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/ngDialog-theme-default.css')?>" />
        <link rel="stylesheet" type="text/css" href="<?= site_url('css/app.css')?>" />
    </head>

    <body ng-controller="healthFacilitiesController">
        <div class="container-justify calculator-container embed">
            <div class="calculator">
                <div class="price-form-container">
                    <h1 class="pre-form-heading text-center undefined">Tafuta kituo cha afya cha karibu</h1>
                    <p class="pre-form-paragraph text-center undefined">Anza kwa kuandika jina la sehemu yako</p>

                    <form class="health-form form-horizontal">
                        <div class="form-group">
                            <div class="<col-xs-12></col-xs-12>">
                                <input placeholder="Jina la Sehemu" value="" id="query" ng-change="newFacility()" ng-model="query" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="button" class="show-result-btn col-sm-offset-5 col-xs-offset-3  btn btn-default" ng-click="searchFacilities()" ng-disabled="disabled">TAFUTA</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script  type="text/ng-template" id="facilities">
            <div class="ngdialog-title">
                <h4>Matokeo ya vituo : {{query}}</h4>
            </div>
            <div class="ngdialog-message" style="height:500px; overflow-y:scroll;">
                <div class="no-results" style="padding-left:20px;"><h5>{{no_results}}</h5></div>
                <div class="facilities" ng-repeat="facility in facilities">
                    <div class="facility">
                        <strong>Jina : </strong><span>{{facility.facility_name}}</span><br />
                        <strong>Aina : </strong><span>{{facility.facility_type}}</span><br />
                        <strong>Hali : </strong><span>{{facility.status}}</span><br />
                        <strong>Umiliki : </strong><span>{{facility.ownership}}</span><br />
                        <strong>Mahali : </strong><span>{{facility.ward}} {{facility.council}}, {{facility.district}}-{{facility.region}}</span><br />
                        <a target="_blank" href="https://www.google.co.tz/maps/search/{{facility.lat}},{{facility.lng}}">View on Map</a>
                    </div>
                </div>
            </div>
        </script>

    <script src="<?= site_url('js/angular.min.js'); ?>"></script>
    <script src="<?= site_url('js/ui-bootstrap-tpls-2.4.0.min.js'); ?>"></script>
    <script src="<?= site_url('js/ngDialog.js'); ?>"></script>
    <script src="<?= site_url('js/mainapp.js'); ?>"></script>
    </body>
</html>