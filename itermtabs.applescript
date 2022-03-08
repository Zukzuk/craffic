tell application "iTerm"
    tell current window
        -- create a tab for background db stuff
        create tab with default profile
        tell current session
            set name to "PostgreSQL"
            write text "docker-compose up"
            activate
        end tell

        -- create tab to run server and client
        create tab with default profile
        tell current session
            set name to "NestJS Server / API"
            write text "cd ./server && npm run start:dev"
            activate
            -- -- split tab vertically to run client
            -- split vertically with default profile
        end tell

        -- create tab to run client
        create tab with default profile
        tell current session
            set name to "ReactJS"
            write text "cd ./web && npm run start"
            activate
        end tell

        tell application "Google Chrome"
            activate
            tell front window to make new tab at after (get active tab) with properties {URL:"localhost:4000/swagger"}
            tell front window to make new tab at after (get active tab) with properties {URL:"localhost:8080"}
        end tell
    end tell
end tell