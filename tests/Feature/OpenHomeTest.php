<?php
use App\Models\User;

test('guest can open home page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

