protected $middlewareGroups = [
    'web' => [
        // ...
        \App\Http\Middleware\StoreIntendedUrl::class,
    ],
];
