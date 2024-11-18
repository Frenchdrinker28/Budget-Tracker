require 'sinatra'
require 'json'

# A simple validation method
def validate_transaction(transaction)
  return 'Invalid amount' if transaction['amount'] <= 0
  return 'Description is required' if transaction['description'].strip.empty?
  'Valid transaction'
end

# Route to accept POST request for transaction validation
post '/validate_transaction' do
  content_type :json

  # Parse the incoming JSON request body
  request_payload = JSON.parse(request.body.read)

  # Validate the transaction
  validation_result = validate_transaction(request_payload)

  # Send back the validation result as JSON
  { status: validation_result }.to_json
end

# Route to display the homepage or an API doc
get '/' do
  "Welcome to the Budget Tracker API"
end