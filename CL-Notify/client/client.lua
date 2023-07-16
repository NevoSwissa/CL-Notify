local QBCore = exports['qb-core']:GetCoreObject()

function Notify(messege, type, time)
    SendNUIMessage({ 
        action = 'Notify',
        messege = messege,
        type = type,
        time = time,
    })
end

exports('Notify', Notify)