<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $person = [
        'name'=> 'Althon',
        'email'=> 'althon@mail.com',
    ];
    dump($person);
    $aboutPageUrl = route('about');
    dd($aboutPageUrl);
    return view('welcome');
});

Route::view('/about', 'about')->name('about');

// Route::get('/about', function() {
//     return view('about');
// });

Route::get('/product/{id}', function(string $id) {
    return "Product ID: $id";
})
->whereNumber(parameters: 'id');

Route::get('/{lang}/product/{id}', function(string $lang, string $id) {
    return "Product ID: $id<br>Product Lang: $lang";
})
->whereNumber(parameters: 'id')
->whereIn("lang", ["en", "ka", "in"]);

Route::get('/user/{username}', function(string $username) {
    return "User Username: $username";
})
->whereAlphaNumeric('username')
->where('username', '[a-z]+');

Route::get('/search/{search}', function(string $search) {
    return $search;
})->where('search', '.+');

Route::get('/product/{category?}', function(string $category = null) {
    return "Product Category = $category";
});

Route::get('/user/profile/{name}', function(String $name) {
    return "Current User: $name";
})->name('profile');

Route::get('/current_user/{name}', function($name){
    return to_route('profile', ['name'=> $name]);
});

Route::prefix('admin')->group(function() {
    Route::get('/users', function() {
        return "admin/users";
    })->name('user');
});

Route::name('admin.')->group(function() {
    Route::get('/users', function() {
        return "admin/users with .";
    })->name('user');
});

Route::fallback(function() {
    return "Fallback";
});

Route::prefix('mathv1')->group(function() {
    Route::get('{a}+{b}', function(float $a, float $b) {
        return $a + $b;
    })->whereNumber(['a', 'b']);
    Route::get('{a}*{b}', function(float $a, float $b) {
        return $a * $b;
    })->whereNumber(['a', 'b']);
    Route::get('{a}-{b}', function(float $a, float $b) {
        return $a - $b;
    })->whereNumber(['a', 'b']);
    Route::get('{a}|{b}', function(float $a, float $b) {
        return $a / $b;
    })->whereNumber(['a', 'b']);
});

// GPT Format - Math Operation (Start)
Route::prefix('mathv2')->whereNumber(['a', 'b'])->group(function () {
    Route::get('{a}/{op}/{b}', function (float $a, string $op, float $b) {
        return match ($op) {
            '+' => $a + $b,
            '-' => $a - $b,
            '*' => $a * $b,
            '|' => $b != 0 ? $a / $b : 'Division by zero error',
            default => 'Unsupported operation'
        };
    })->where('op', '[\+\-\*\|]');
});
// GPT Format - Math Operation (End)

Route::get('/sum/{a}+{b}', function(float $a, float $b) {
    return $a + $b;
})->whereNumber(['a', 'b']);

Route::get('/sum/{a}x{b}', function(float $a, float $b) {
    return $a * $b;
})->whereNumber(['a', 'b']);

Route::controller(CarController::class)->group(function() {
    Route::get('/car', 'index');
    Route::get('/my-cars', 'myCars');
});

// Include all methods in a resource controller
Route::resource('product', ProductController::class); 

// Include only the method related to API in a resource controller
Route::apiResource('product', ProductController::class);

// Multiple api resource route grouping
Route::apiResources([
    'cars' => CarController::class,
    'cars' => ProductController::class,
]);
// API - To only include method related to API
// Resource - Include all methods (create/edit methods (form pages))
// php artisan make:controller controllerNameController --api/--resource

// Math Task Sample
// Controller
public function sum(float $a, float $b)
{
    return $a + $b;
}

public function subtract(float $a, float $b)
{
    return $a - $b;
}
//Routes
Route::controller(MathController::class)->group(function() {
    Route::get('/sum/{a}/{b}', 'sum')->whereNumber(['a','b']);
    Route::get('/subtract/{a}/{b}', 'subtract')->whereNumber(['a','b']);
});

// PAssing parameters from controller to view challenge - start
// Routes
Route::get('/hello', [HelloController::class, 'welcome'])->name('hello');
// Controller
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    public function welcome()
    {
        return view('hello.welcome')
        ->with("Name", "Althon")
        ->with("Surname", "<b>Tomada</b>");

        // could be:
        // return view('hello.welcome',[
        //     "Name" => "Althon",
        //     "Surname" => "Tomada"
        // ]);

        // could be:
        // use Illuminate\Support\Facades\View; // Make sure to import
        // return View::make('hello.welcome',[
        //     "Name" => "Althon",
        //     "Surname" => "Tomada"
        // ]);
    }
}
// View
<div>
   Hello {{ $Name }} {!! $Surname !!}! @{{ static content }}
</div>
// PAssing parameters from controller to view challenge - End

// Shared files/components challenge - Start
// Shared View
<div @style([
    'background-color: ' . $bgColor,
    'padding: 10px'
])>
{{ $text }}
</div>
// Main View
<div>
   @include('alert', [
      'bgColor' => 'yellow',
      'text' => 'Good Day!'
   ])
</div>
// Shared files/components challenge - End


