variable "location" {
  description = "Azure region where the ChrisLabs CloudOps resources will be deployed."
  type        = string
  default     = "eastus"
}

variable "resource_group_name" {
  description = "Name of the ChrisLabs CloudOps resource group."
  type        = string
  default     = "rg-chrislabs-cloudops-lab"
}

variable "vnet_address_space" {
  description = "Address space used by the ChrisLabs CloudOps virtual network."
  type        = list(string)
  default     = ["10.10.0.0/16"]
}

variable "app_subnet_prefix" {
  description = "Address prefix used by the application subnet."
  type        = list(string)
  default     = ["10.10.1.0/24"]
}

variable "management_subnet_prefix" {
  description = "Address prefix used by the management subnet."
  type        = list(string)
  default     = ["10.10.2.0/24"]
}