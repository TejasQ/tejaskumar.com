workflow "Deploy to Now" {
  on = "push"
  resolves = ["Alias with Prefix"]
}

action "Deploy" {
  uses = "actions/zeit-now@master"
  secrets = ["ZEIT_TOKEN"]
}

action "Alias" {
  needs = ["Deploy"]
  uses = "actions/zeit-now@master"
  args = "alias tejaskumar.com"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "Alias with Prefix" {
  needs = ["Alias"]
  uses = "actions/zeit-now@master"
  args = "alias www.tejaskumar.com"
  secrets = [
    "ZEIT_TOKEN",
  ]
}
