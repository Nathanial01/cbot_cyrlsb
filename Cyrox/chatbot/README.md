# chatbot
#composer require cyrox/chatbot:dev-main#

Cyrox Chatbot This is a lightweight chatbot package that can be easily embedded into any website via Composer. It integrates with OpenAI to provide chatbot functionality. Installation and Setup

Install the Package First, you need to require the package using Composer. Run the following command: composer require cyrox/chatbot:dev-main This will install the chatbot package and its dependencies in your project.
Configure Service Provider Once installed, you need to register the ChatbotServiceProvider in your Laravel application. Open the config/app.php file and add the following line to the providers array: 'providers' => [ // Other Service Providers... Cyrox\Chatbot\ChatbotServiceProvider::class, ], This step allows Laravel to recognize and load the chatbot service provider, making the package functional in your application.
Update Composer Configuration If you manage your composer.json file manually, you should add the following section: "require": { "cyrox/chatbot": "dev-main" }, "repositories": [ { "type": "vcs", "url": "https://github.com/Nathanial01/chatbot.git" } ]
Environment Variables Add your OpenAI API key to your .env file to enable communication with OpenAI services: OPENAI_API_KEY="your_openai_api_key_here"
Frontend Styling Ensure that your chatbot looks good by including Tailwind CSS in your views. Add the following lines to the HTML head of your view:
6. Using the Chatbot Component Now that everything is set up, you can include the chatbot component in your Laravel blade views by using: @include('chatbot::components.chatbot') This will render the chatbot in your application's frontend. move the publice forlde from vendor/cyrox/chatbot/public to ur laravel seceleton public folder ![image](https://github.com/user-attachments/assets/8c89150b-5e43-4569-b916-5f834123e8d3)
