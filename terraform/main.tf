locals {
  common_tags = {
    Project     = "ChrisLabs-CloudOps"
    Environment = "Lab"
    ManagedBy   = "Terraform"
    Owner       = "Christian-Valente"
    CostCenter  = "Personal-Lab"
  }
}

resource "azurerm_resource_group" "cloudops" {
  name     = var.resource_group_name
  location = var.location

  tags = local.common_tags
}

resource "azurerm_virtual_network" "cloudops" {
  name                = "vnet-chrislabs-cloudops-lab"
  location            = azurerm_resource_group.cloudops.location
  resource_group_name = azurerm_resource_group.cloudops.name
  address_space       = var.vnet_address_space

  tags = local.common_tags
}

resource "azurerm_subnet" "app" {
  name                 = "snet-app"
  resource_group_name  = azurerm_resource_group.cloudops.name
  virtual_network_name = azurerm_virtual_network.cloudops.name
  address_prefixes     = var.app_subnet_prefix
}

resource "azurerm_subnet" "management" {
  name                 = "snet-management"
  resource_group_name  = azurerm_resource_group.cloudops.name
  virtual_network_name = azurerm_virtual_network.cloudops.name
  address_prefixes     = var.management_subnet_prefix
}