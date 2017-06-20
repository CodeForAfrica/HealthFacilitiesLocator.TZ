<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {


  public function __construct(){
    parent::__construct();
  }

  function index(){

    $response = array(
      'status'=> 200,
      'message'=>'OK'
    );
    header('Content-Type: application/json');
    echo json_encode($response);
  }

  function facilities(){

    $q = $this->input->get('q');
    $region = $this->input->get('region');
    $district = $this->input->get('district');
    $ward = $this->input->get('ward');
    $village = $this->input->get('village');

    $lat = $this->input->get('lat');
    $lon = $this->input->get('lon');
    //$rad = $this->input->get('rad');
    $rad = 2;

    if( !isset($q) OR $q == NULL){
      $response = array(
        'status'=> 404,
        'message'=> 'Resource was not found'
      );
    }
    else{
      //search matching region, district, ward, village

      $query = array(
        'region' => $region == NULL ? $q : $region,
        'district' => $district == NULL ? $q : $district,
        'ward' => $ward == NULL ? $q : $ward,
        'village' => $village == NULL ? $q : $village
      );

      $all_levels = count(array_count_values($query)) == 1 ? 1 : 0;

      #remove level not specified in api request
      if( !$all_levels ){
        if( !$region )
          unset($query['region']);

        if( !$district )
          unset($query['district']);

        if( !$ward )
          unset($query['ward']);

        if( !$village )
          unset($query['village']);
      }

      $result = $this->HFacilities->search($query, $all_levels);

      if( $result == NULL ){
        $response = array(
          'status' => 404,
          'message' => 'No results found'
        );
      }else{
         $response = array(
           'status' => 200,
           'message' => 'Success',
           'facilities' => $result
         );
      }
    }

    if(isset($lat) && isset($lon)){
      $result = $this->HFacilities->getMarkers($lat,$lon,$rad);

      if( $result == NULL ){
        $response = array(
          'status' => 404,
          'message' => 'No results found'
        );
      }else{
         $response = array(
           'status' => 200,
           'message' => 'Success',
           'facilities' => $result
         );
      }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
  }

}
