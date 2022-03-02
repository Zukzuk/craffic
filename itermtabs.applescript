tell application "iTerm"
    tell current window
        -- create a tab for background db stuff
        create tab with default profile
        tell current session
            set name to "PostgreSQL"
            write text "docker-compose up"
        end tell

        -- create tab to run server and client
        create tab with default profile
        tell current session
            set name to "NestJS Server / API"
            write text "cd server && npm run start:dev"
            -- split tab vertically to run client
            split vertically with default profile
        end tell

        -- run client
        tell last session of last tab
            set name to "ReactJS Web Client"
            write text "cd web && npm run start"
        end tell

        tell application "Google Chrome"
            activate
            tell front window to make new tab at after (get active tab) with properties {URL:"localhost:4000/swagger"}
            tell front window to make new tab at after (get active tab) with properties {URL:"localhost:8080"}
        end tell
    end tell
end tell