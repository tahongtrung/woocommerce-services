<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( 'WC_REST_Connect_PayPal_Payment_Create_Controller' ) ) {
	return;
}

class WC_REST_Connect_PayPal_Payment_Create_Controller extends WC_REST_Connect_Base_Controller {
	protected $rest_base = 'connect/paypal/payment';
	private $paypal;

	public function __construct( WC_Connect_PayPal $paypal, WC_Connect_API_Client $api_client, WC_Connect_Service_Settings_Store $settings_store, WC_Connect_Logger $logger ) {
		parent::__construct( $api_client, $settings_store, $logger );
		$this->paypal = $paypal;
	}

	public function post( $request ) {
		$response = $this->paypal->create_payment( $request['email'], $request['amount'], $request['currency'] );

		if ( is_wp_error( $response ) ) {
			$response->add_data( array(
				'message' => $response->get_error_message(),
			), $response->get_error_code() );

			$this->logger->debug( $response, __CLASS__ );
			return $response;
		}

		return array(
			'success'   => true,
			'id' => $response->id,
			'state' => $response->state,
		);
	}

	public function check_permission( $request ) {
		return true;
	}
}