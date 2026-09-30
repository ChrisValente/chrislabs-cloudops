output "resource_group_name" {
  description = "Name of the ChrisLabs CloudOps resource group."
  value       = azurerm_resource_group.cloudops.name
}

output "virtual_network_name" {
  description = "Name of the ChrisLabs CloudOps virtual network."
  value       = azurerm_virtual_network.cloudops.name
}

output "virtual_network_id" {
  description = "Resource ID of the ChrisLabs CloudOps virtual network."
  value       = azurerm_virtual_network.cloudops.id
}

output "app_subnet_id" {
  description = "Resource ID of the application subnet."
  value       = azurerm_subnet.app.id
}

output "management_subnet_id" {
  description = "Resource ID of the management subnet."
  value       = azurerm_subnet.management.id
}

output "static_web_app_hostname" {
  description = "Default hostname of the ChrisLabs CloudOps Static Web App."
  value       = azurerm_static_web_app.cloudops.default_host_name
}