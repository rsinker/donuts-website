---
title: Home
layout: home
tags: page
modified: 2022-01-09 00:00:00
order: 1
---
<div class = "">
<div class = "flex justify-center"><img class="mb-12 h-[512px]" src = "/images/Promotion/Donuts_Logo_Tian.png"></div>
<p class="title mb-12 text-center sm:text-left">
Donuts! is a slapstick 3D driving/skateboarding game meets food delivery service.
</p>
<div class="text-xl md:text-2xl">
	<p class = "mb-8">You play as Mony, a first generation Cambodian-American, as she sets off to save her family's slowing donut business through means of food trucks, viral marketing, and radical tricks!</p>
	<a href = "mailto:hey@roosevelt.games" class = "highlight underline"> Let's build something better, together</a>
</div>

<h1 class = "title text-center sm:text-left"> Featured Project </h1>
{% for project in projects %}
{% if project.featured %}
<a href = "/projects/{{project.title | slugify}}">
<div class = "p-4 hover:bg-stone-100 rounded-xl">
<div class = "bg-slate-50 rounded-2xl border border-gray-400 border-2 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 overflow-hidden">
	<div class = "bg-no-repeat bg-center bg-cover" style = "background-image: url('/images/{{project.image}}');">
	</div>
	<div class = "bg-amber-400">
		<div class = "m-3 md:m-8 testspace">
			<h2 class = "text-4xl font-bold text-slate-800 text-center">{{project.title}} </h2>
			<p class = "highlight font-bold text-center text-2xl md:mb-8"> {{project.role}} </p>
			<p class = "text-slate-800"> {{project.summary}} </p>
			<p>  </p>
		</div>
	</div>
</div>
</div>
</a>
{% endif %}
{% endfor %}

<h1 class = "title text-center sm:text-left"> Lastest Blog Post </h1>

{% set latest_posts = collections.posts | reverse %} {% for post in latest_posts.slice(0,1) %}

<a href = "{{post.url}}">
<div class = "p-4 hover:bg-stone-100 rounded-xl">
<div class = "bg-slate-50 rounded-2xl border border-gray-400 border-2 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 overflow-hidden">
	<div class = "bg-amber-400 row-start-2 md:row-start-1">
		<div class = "m-3 md:m-8 testspace">
			<h2 class = "text-4xl font-bold text-slate-800 text-center">{{post.data.title}} </h2>
			<p class = "text-slate-800 mt-4"> {{post.data.summary}} </p>
			<p>  </p>
		</div>
	</div>
	<div class = "bg-no-repeat bg-center bg-cover" style = "background-image: url('/images/blog/{{post.data.image}}');">
	</div>
</div>
</div>
</a>
{% endfor %}
</div>