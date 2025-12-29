protected $middlewareGroups = [
'web' => [
// ...
\App\Http\Middleware\StoreIntendedUrl::class,
\App\Http\Middleware\EnsureSingleSession::class,
'admin' => \App\Http\Middleware\AdminOnly::class,
'role' => \App\Http\Middleware\RoleMiddleware::class,
],
];