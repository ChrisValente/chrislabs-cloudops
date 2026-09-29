terraform {
  backend "azurerm" {
    resource_group_name  = "rg-chrislabs-tfstate-lab"
    storage_account_name = "stchrislabstfstate01"
    container_name       = "tfstate"
    key                  = "chrislabs-cloudops.tfstate"
    use_azuread_auth     = true
  }
}