#!/bin/bash

mix clean
mix compile
export SECRET_KEY_BASE=$(mix phx.gen.secret)
mix phx.digest.clean
mix phx.digest
MIX_ENV=prod mix release

