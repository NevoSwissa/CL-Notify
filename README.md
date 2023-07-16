# CL-Notify
Simple and clean notification system.

Join our Discord server for future updated and more script releases : https://discord.gg/rp6ynCJTKK

Preview : 

![image](https://github.com/NevoSwissa/CL-Notify/assets/96447671/60f4d645-a4ce-414e-9995-d066d029bc3f)

# Usage

In order to replace the qb-core default notification system follow the steps :

1. Go to qb-core > client > functions.lua
2. Go to line 88 / search using CTRL + F `QBCore.Functions.Notify`
3. Replace the `QBCore.Functions.Notify` function with the following updated function :
```lua
function QBCore.Functions.Notify(text, texttype, length)
    if type(text) == "table" then
        exports["CL-Notify"]:Notify(text.text, texttype, length)
    else
        exports["CL-Notify"]:Notify(text, texttype, length)
    end
end
```

Currently the script does NOT support caption usage type notification, this would be added in a future update.

# Credits

This resourse was developed fully by CloudDevelopment.
