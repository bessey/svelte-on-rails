class PagesController < ApplicationController
  around_action :hypernova_render_support

  def main
  end
end
