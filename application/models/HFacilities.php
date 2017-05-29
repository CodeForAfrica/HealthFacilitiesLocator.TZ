<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HFacilities extends CI_Model {



  function search($kwargs, $all_levels){

    if( !$kwargs ){
      return NULL;
    }
    if( $all_levels )
      $result = $this->db->or_like($kwargs)->get('pro_health_facilities');
    else
      $result = $this->db->like($kwargs)->get('pro_health_facilities');

    #print_r($this->db->last_query());
    if( $result->num_rows()){
      return $result->result_array();
    }else{
      return NULL;
    }
  }

}
