CLASS LAUNCHER PWA
==================

This is the HTTPS / installable version of Class Launcher.

WHAT IS NEW
-----------
• Installable as an Edge web app (PWA)
• Persistent notifications through a service worker
• Notification diagnostics:
  - HTTPS secure context
  - Notification API availability
  - notification permission
  - service worker support/status
  - installed-app status
  - page visibility
  - last test result
• Start + End times
• Weekly calendar and recurring schedules
• Export / import backup

IMPORTANT: DO NOT OPEN index.html DIRECTLY
------------------------------------------
Service workers and reliable web notifications require an HTTPS website
(or localhost during development).

EASIEST DEPLOYMENT: NETLIFY DROP
--------------------------------
1. Extract ClassLauncher_PWA.zip.
2. Go to:
   https://app.netlify.com/drop
3. Drag the entire ClassLauncher_PWA folder onto that page.
4. Netlify gives you an https://... address.
5. Open that HTTPS address in Microsoft Edge.
6. Click "Enable notifications".
7. Click "Test notification".
8. Check the diagnostics panel.
9. If Edge offers "Install app", click it. If not, use:
   Edge menu (...) > Apps > Install this site as an app.

You can also deploy these static files to GitHub Pages, Azure Static Web Apps,
Cloudflare Pages, or another HTTPS static host.

MANAGED MICROSOFT COMPUTER
--------------------------
If diagnostics show:
  HTTPS = Yes
  Notification API = Available
  Permission = granted
  Service worker = Active

but Test notification still produces no Windows notification, the likely
remaining blocker is organization policy or Windows/Edge notification settings.

REMINDER LIMITATION
-------------------
Keep Class Launcher open or minimized for scheduled reminders.

The service worker makes displayed notifications persistent and clickable,
but a static PWA does NOT have a guaranteed browser mechanism to wake itself
at an arbitrary future class time after the app is fully closed.

For truly closed-app scheduled notifications, Class Launcher would need a
server-side Web Push service (Push API + VAPID) or an approved calendar/
notification system.

DATA
----
Schedules are stored locally in the browser profile for the deployed HTTPS
site. Use Export to keep a backup.

Moving to a different domain/site creates a different browser storage origin,
so use Export on the old site and Import on the new site.
