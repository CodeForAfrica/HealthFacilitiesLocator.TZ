<!DOCTYPE html>

<html lang="en-US">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href='http://fonts.googleapis.com/css?family=Roboto:700,400,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="<?= site_url('assets/bootstrap/css/bootstrap.css'); ?>" type="text/css">
    <link rel="stylesheet" href="<?= site_url('assets/css/bootstrap-select.min.css'); ?>" type="text/css">
    <link rel="stylesheet" href="<?= site_url('assets/css/owl.carousel.css'); ?>" type="text/css">
    <link rel="stylesheet" href="<?= site_url('assets/css/jquery.nouislider.min.css'); ?>" type="text/css">
    <link rel="stylesheet" href="<?= site_url('assets/css/style.css'); ?>" type="text/css">

    <title>(BETA) Health Facilities Locator - Code For Tanzania</title>

</head>

<body id="page-top" class="fullscreen-map has-map">

<div id="page-wrapper">
    <header class="animate" id="header">
        <div class="container">
            <div class="header-inner">
                <nav class="main">
                    <div class="brand">
                        <a href="index-map-fullscreen.html">
                            <img src="<?= site_url('img/logo.png'); ?>" style="height: 3.5em;" alt="brand">
                        </a>
                    </div>
                    <ul>
                      <li>
                          <a href="#" >Contact</a>
                      </li>
                        <li>
                            <a href="#" class="has-child">Embed</a>
                        </li>

                        <li>
                        <a href=" https://facebook.com/CodeForAfrica" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        </li>
                        <li><a href="https://twitter.com/code4africa" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                    </ul>
                </nav>
                <!--end Main navigation-->
            </div>
            <!--end .header-inner-->
        </div>
        <!--end .container-->

        <div class="container">
            <div class="submit-container">
                <a href="#search-collapse" class="btn btn-default btn-sm show-filter" data-toggle="collapse" aria-expanded="false" aria-controls="search-collapse">Search Filter</a>
            </div>
        </div>
    </header>
    <!--end Header-->

    <div class="page-content">
        <div class="search collapse in" id="search-collapse">
            <div class="container">
                <form class="main-search" role="form" method="post" action="#">
                    <div class="row">
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label for="location">Location</label>
                                <div class="input-group location">
                                    <input type="text" class="form-control" id="location" placeholder="Enter Location">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default animate" type="button"><i class="fa fa-map-marker geolocation" data-toggle="tooltip" data-placement="bottom" title="Find my position"></i></button>
                                    </span>
                                </div>
                            </div>
                            <!-- /.form-group -->
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label for="type">Facility Type</label>
                                <select name="type" title="All" id="type" class="animate" data-transition-parent=".dropdown-menu">
                                    <option value="All">All</option>
                                    <option value="Hospital">Hospital</option>
                                    <option value="Clinic">Clinic</option>
                                    <option value="Clinic-Dental-Clinic">Clinic - Dental Clinic</option>
                                    <option value="Clinic-Eye-Clinic">Clinic - Eye Clinic</option>
                                    <option value="Clinic-Other-Clinic">Clinic - Other Clinic</option>
                                    <option value="Dispensary">Dispensary</option>
                                    <option value="Health-Center">Health Center</option>
                                    <option value="Health-Labs">Health Labs</option>
                                    <option value="Hospital-Designated-District-Hospital">Hospital - Designated District Hospital</option>
                                    <option value="Hospial-District-Hospital">Hospital - District Hospital</option>
                                    <option value="Hospital-National-Hospital">Hospital - National Hospital</option>
                                    <option value="Hospital-National-Super-Specialist-Hospital">Hospital - National Super Specialist Hospital</option>
                                    <option value="Hospital-Other-Hospital">Hospital - Other Hospital</option>
                                    <option value="Hospital-Referral-Hospital">Hospital - Referral Hospital</option>
                                    <option value="Hospital-Regional-Referral-Hospital">Hospital - Regional Referral Hospital</option>
                                    <option value="Hospital-Zonal-Super-Specialist-Hospital">Hospital - Zonal Super Specialist Hospital</option>
                                    <option value="Maternity-Home">Maternity Home</option>
                                    <option value="Nursing-Home">Nursing Home</option>
                                </select>
                            </div>
                            <!-- /.form-group -->
                        </div>
                        <!--/.col-md-6-->
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label for="type">Operation Status</label>
                                <select name="type" title="All" id="type" class="animate" data-transition-parent=".dropdown-menu">
                                    <option value="All">All</option>
                                    <option value="Operating">Operating</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Closed-Temporary">Closed - Temporary</option>
                                    <option value="Pending-Op">Pending Op</option>
                                </select>
                            </div>
                            <!-- /.form-group -->
                        </div>
                        <!--/.col-md-6-->
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label for="type">Ownership Type</label>
                                <select name="type" title="All" id="type" class="animate" data-transition-parent=".dropdown-menu">
                                    <option value="All">All</option>
                                    <option value="Public">Public</option>
                                    <option value="Public-Military">Public - Military</option>
                                    <option value="Public-Parastatal">Public - Parastatal</option>
                                    <option value="Public-Police">Public - Police</option>
                                    <option value="Private">Private</option>
                                    <option value="Private-NGOs">Private - NGOs</option>
                                    <option value="Health-Center">Public - LGA</option>
                                    <option value="Health-Labs">Public MoHSW</option>
                                    <option value="Public-Other-MDAs">Public - Other MDAs</option>
                                    <option value="Public-Prisons">Public - Prisons</option>
                                    <option value="Public-TASAF">Public - TASAF</option>
                                    <option value="">Private - Faith based organization (FBO)</option>
                                    <option value="">Private - Faith based organization (FBO) - African Inland Church</option>
                                    <option value="">Private - Faith based organization (FBO) - Anglican</option>
                                    <option value="">Private - Faith based organization (FBO) - Assemblies of God</option>
                                    <option value="">Private - Faith based organization (FBO) - Bakwata</option>
                                    <option value="">Private - Faith based organization (FBO) - Baptist/SDA</option>
                                    <option value="">Private - Faith based organization (FBO) - Catholic</option>
                                    <option value="">Private - Faith based organization (FBO) - Lutheran</option>
                                    <option value="">Private - Faith based organization (FBO) - Moravian</option>
                                    <option value="">Private - Faith based organization (FBO) - Pentecoste</option>
                                    <option value="Private-For-Profit">Private - For Profit</option>
                                </select>
                            </div>
                            <!-- /.form-group -->
                        </div>
                    </div>
                    <!--/.row-->
                </form>
                <!-- /.main-search -->
            </div>
            <!--end .container-->
        </div>
        <!--end .search-->

        <div class="content-inner">
            <div class="container" id="main-container">
                <div class="content-loader">
                    <div class="content fade_in animate">
                        <a href="#" class="close" id="close"><img src="assets/img/close.png" alt=""></a>
                        <!--external content goes here-->
                    </div>
                </div>
                <!--end Content Loader-->
            </div>
        </div>

        <div class="map-wrapper grid">
            <div class="map" id="map"></div>
            <!--end .map-->
        </div>
        <!--end .map-wrapper-->

    </div>
    <!--end Page Content-->
</div>

<script type="text/javascript" src="<?= site_url('assets/js/jquery-2.1.0.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/imagesloaded.pkgd.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/jquery-migrate-1.2.1.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/bootstrap/js/bootstrap.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/jquery.color-2.1.2.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/jquery.average-color.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/masonry.pkgd.min.js'); ?>"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCydZe1MtPGet_sauqr_k4WsEU0liZCdwU&libraries=places"></script>
<script type="text/javascript" src="<?= site_url('assets/js/infobox.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/richmarker-compiled.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/markerclusterer.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/smoothscroll.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/owl.carousel.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/bootstrap-select.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/icheck.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/jquery.nouislider.all.min.js'); ?>"></script>
<!--<script type="text/javascript" src="assets/js/jquery.event.ue.js"></script>-->
<!--<script type="text/javascript" src="assets/js/jquery.udraggable.js"></script>-->
<script type="text/javascript" src="<?= site_url('assets/js/jquery.inview.min.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/functions.js'); ?>"></script>
<script type="text/javascript" src="<?= site_url('assets/js/custom.js'); ?>"></script>

<!--[if lte IE 9]>
<script type="text/javascript" src="assets/js/ie-scripts.js"></script>
<![endif]-->

<script>
    var jsonPath = 'assets/json/items.json';

    // Getting user current location
    var LATITUDE = "";
    var LONGITUDE = "";
    var jsonPath = 'api/facilities?q=ubungo';

    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(location) {
            LATITUDE = location.coords.latitude;
            LONGITUDE = location.coords.longitude;

            jsonPath = 'api/facilities?lat='+ LATITUDE +'&lon='+LONGITUDE;

            $.getJSON(jsonPath)
                .done(function(json) {
                    createHomepageGoogleMap(LATITUDE,LONGITUDE,json);
                })
                .fail(function( jqxhr, textStatus, error ) {
                    console.log(error);
                });
        });
    }
    else{
        // Default Location
        LATITUDE = "";
        LONGITUDE =  "";
    }
</script>

</body>
</html>
