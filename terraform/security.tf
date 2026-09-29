resource "azurerm_network_security_group" "app" {
  name                = "nsg-chrislabs-app-lab"
  location            = azurerm_resource_group.cloudops.location
  resource_group_name = azurerm_resource_group.cloudops.name

  tags = local.common_tags
}

resource "azurerm_network_security_group" "management" {
  name                = "nsg-chrislabs-management-lab"
  location            = azurerm_resource_group.cloudops.location
  resource_group_name = azurerm_resource_group.cloudops.name

  tags = local.common_tags
}

resource "azurerm_subnet_network_security_group_association" "app" {
  subnet_id                 = azurerm_subnet.app.id
  network_security_group_id = azurerm_network_security_group.app.id
}

resource "azurerm_subnet_network_security_group_association" "management" {
  subnet_id                 = azurerm_subnet.management.id
  network_security_group_id = azurerm_network_security_group.management.id
}