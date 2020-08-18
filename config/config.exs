# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :breakout, BreakoutWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "inp1KpJOrFYtLlfHPP0/Y6Hv4qRcdjG1a6GgTb4PaUa9+M4R3w2FDzDy8Nga3CzT",
  render_errors: [view: BreakoutWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Breakout.PubSub,
  live_view: [signing_salt: "wuNo2LQs"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
