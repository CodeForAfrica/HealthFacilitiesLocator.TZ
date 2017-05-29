<div class="container calculator-container">
    <div class="calculator">
        <div class="price-form-container">
            <p class="sub text-center undefined">Usiwe na shaka kupata huduma kwani vituo vya afya vipo karibu yako.</p>
            <h1 class="pre-form-heading text-center undefined">Tafuta kituo cha afya cha karibu</h1>
            <p class="pre-form-paragraph text-center undefined">Anza kwa kuandika jina la sehemu yako</p>

            <form class="health-form form-horizontal">
                <div class="form-group">
                    <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-0 col-xs-offset-0 ">
                        <input placeholder="Jina la Sehemu" value="" id="query" class="form-control" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <button type="button" class="show-result-btn col-sm-offset-5 col-xs-offset-3  btn btn-default" ng-click="searchFacilities()">TAFUTA</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script  type="text/ng-template" id="embed">
    <div class="ngdialog-title">
        <h4>Pachika kifaa hichi</h4>
    </div>
    <div class="ngdialog-message" style="padding:1em;padding-bottom:2em;">
        <p>Nakili kanuni zilizopachikwa hapa chini na uziweke kwenye tovuti yako!</p>
        <textarea class="form-control"><iframe src="<?= site_url('embed'); ?>" frameborder="0" scrolling="no" height="400px" width="100%"></iframe></textarea>
    </div>
</script>

<script  type="text/ng-template" id="facilities">
    <div class="ngdialog-title">
        <h4>Matokeo ya vituo : {{query}}</h4>
    </div>
    <div class="ngdialog-message" style="height:450px; overflow-y:scroll;">
        <div class="facilities" ng-repeat="facility in facilities">
            <div class="facility">
                <strong>Jina : </strong><span>{{facility.facility_name}}</span><br />
                <strong>Aina : </strong><span>{{facility.facility_type}}</span><br />
                <strong>Hali : </strong><span>{{facility.status}}</span><br />
                <strong>Umiliki : </strong><span>{{facility.ownership}}</span><br />
                <strong>Mahali : </strong><span>{{facility.ward}} {{facility.council}}, {{facility.district}}-{{facility.region}}</span>
            </div>
        </div>
    </div>
</script>