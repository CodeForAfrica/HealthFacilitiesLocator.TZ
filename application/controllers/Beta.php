<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Beta extends CI_Controller {
    public function index()
	{
        $this->load->view('beta/main_view');
    }
}