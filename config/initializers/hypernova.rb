Hypernova.configure do |config|
  config.host = "localhost"
  config.port = 3030
  config.timeout = 1.0
end

class HypernovaDebugPlugin
  # prepare_request allows you to alter the request object in any way that you
  # need.
  def prepare_request(current_request, original_request)
    current_request
  end

  # after_response gives you a chance to alter the response from hypernova.
  def after_response(current_response, original_response)
    current_response
  end

  def on_error(error, *args)
    Rails.logger.warn "Hypernova Error: \n#{error["stack"].join("\n")}"
  end
end

Hypernova.add_plugin!(::HypernovaDebugPlugin.new)
