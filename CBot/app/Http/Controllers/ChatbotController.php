<?php

namespace App\Http\Controllers;

use App\Models\chatbot;
use App\Http\Requests\StorechatbotRequest;
use App\Http\Requests\UpdatechatbotRequest;

class ChatbotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorechatbotRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        return view('app')->with('content', view('vendor.cyrox.chatbot.chatbot'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(chatbot $chatbot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatechatbotRequest $request, chatbot $chatbot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(chatbot $chatbot)
    {
        //
    }
}
