<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Embed extends CI_Controller {
    public function index()
	{
		$this->load->view('embed/main_view');
	}
}