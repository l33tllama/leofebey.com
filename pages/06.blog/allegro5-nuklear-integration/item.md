---
title: Allegro 5 + Nuklear UI Integration Notes
taxonomy:
	tag: [allegro5, game, linux, c, ui, nuklear]
date: '03-06-2020 22:00'
---

# Allegro 5 and Nuklear UI Integration Notes

I'm trying to make a very full-featured game with Allegro 5. And for the UI side of things, I don't want to cut corners and make something too simple, nor do I want to spend an absurd amount of time making my own UI. So, I chose to use the most obvious, easy to find choice for C, the Nuklear immediate-mode UI. It is very good because it includes Allegro 5 integration, using the allegro rendering features.

The Github repo for it provides a good demo for using with Allegro. However, it does not show how to mix Allegro 5 graphics and Nuklear UI rendering at the same time. For example, I have numerous elements in the game that render on-screen, such as the background, the player, the enemies, etc, and I also want to intermix the Nuklear UI. The demo only shows how to render the UI exclusively.

The problem I ran into quickly was that rendering my game plus the Nuklear UI didn't work, it crashed. The Nuklear UI seems to lose context when the renderer is waiting to draw a new frame. In my game code, the rendering of graphics only happens on a 1/60th of a second timer, so that the rendering doesn't bog up the CPU, causing massive slow-downs. When mixing this approach with Nuklear, it crashes.

There was a simple fix for rendering the main menu. I would draw the menu graphics and the nuklear UI independetly of the 1/60th second timer. So it was rendering a lot, but not rendering much as it was just the main menu. This worked.

My main menu rendering code looked like this:
```C
struct nk_context *ctx = get_menu_nk_ctx();

while(!doexit){
	ALLEGRO_EVENT ev;
	
	nk_input_begin(ctx);
	al_wait_for_event(event_queue, &ev);
	nk_allegro5_handle_event(&ev);
	nk_input_end(ctx);

	/* Event handlers go here */

	al_clear_to_color(al_map_rgb(0,0,0));
		
	menu_draw_background();

	menu_draw_nk();

	if(redraw && al_is_event_queue_empty(event_queue)){
		redraw = false;
		draw_all();
		al_flip_display();
	}
}
```

The problem with this is that you can't draw the UI over the top of the game graphics. I came up with a solution that would let me draw a menu over the game graphics, for the in-game menu. The trick was to handle drawing the graphics differntly when the game was paused and showing the menu. When paused, it draws everything on the 1/60h sec timer, then the Nuklear menu, then if it is time to redraw (same 1/60th timer) it then flips the display to swap buffers (re-render new images). This lets the nuklear UI keep rendering constantly and the game graphics still keep rendering on 1/60th sec timer independently.

```C

struct nk_context *ctx = get_menu_nk_ctx();

while(!doexit){
	ALLEGRO_EVENT ev;
	
	nk_input_begin(ctx);
	al_wait_for_event(event_queue, &ev);
	nk_allegro5_handle_event(&ev);
	nk_input_end(ctx);

	/* Event handlers go here */

	al_clear_to_color(al_map_rgb(0,0,0));
				
	menu_draw_background();

	bool _redraw = false;

	/* Draw graphics on 1/60th sec timer */
	if(game_state == STATE_PAUSED && redraw && al_is_event_queue_empty(event_queue)){
		redraw = false;
		_redraw = true;
		draw_all();
	} 

	// Draw constantly
	menu_draw_nk();

	/* Flip buffer on 1/60th sec timer */
	if(game_state == STATE_PAUSED && _redraw){
		redraw = false;
		cursor_draw();
		al_flip_display();
	}

	// In-game - draw and flip buffer
	if(game_state != STATE_PAUSED && redraw && al_is_event_queue_empty(event_queue)){
		redraw = false;
		draw_all();
		al_flip_display();
	}
}
```
Fairly simple fix, but might not be super intuitive for some people. You need that second _redraw variable to keep track of when the redraw is happening, including when the event queue is empty.

Hopefully this helps someone who is using Allegro 5 to integrate Nuklear UI into their game. I'm not sure if there are any other resources showing how to do this on the net.




