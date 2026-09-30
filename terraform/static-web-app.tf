resource "azurerm_static_web_app" "cloudops" {
  name                = "swa-chrislabs-cloudops-lab"
  resource_group_name = azurerm_resource_group.cloudops.name
  location            = "eastus2"

  sku_tier = "Free"
  sku_size = "Free"

  public_network_access_enabled = true

  tags = local.common_tags
}
