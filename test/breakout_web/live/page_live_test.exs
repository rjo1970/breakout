defmodule BreakoutWeb.PageLiveTest do
  use BreakoutWeb.ConnCase

  import Phoenix.LiveViewTest

  test "disconnected and connected render", %{conn: conn} do
    {:ok, page_live, disconnected_html} = live(conn, "/")
    assert disconnected_html =~ "Breakout"
    assert render(page_live) =~ "Breakout"
  end
end
