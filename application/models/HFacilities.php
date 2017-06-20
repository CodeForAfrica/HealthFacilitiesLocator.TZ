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

  public function getMarkers($lat,$lng,$rad){
    /*
    $this->db->select("*, ( 3959 * acos( cos( radians($lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin( radians( lat ) ) ) ) AS distance");                         
    $this->db->having('distance <= ' . $rad);                     
    $this->db->order_by('distance');                    
    $this->db->limit(20, 0);

    $query = $this->db->get();
    $result = $query->result();
    return $result;
    */

    $this->db->select("*, ( 3959 * acos( cos( radians($lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin( radians( lat ) ) ) ) AS distance");
    $this->db->from('pro_health_facilities');
    $this->db->having('distance <= ' . $rad);
    $this->db->order_by('distance');
    $this->db->limit(20, 0); 
    $query = $this->db->get();
    $result = $query->result();
    return $result; 
  }

}
