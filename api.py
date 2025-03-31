import requests
import json

# API URL and headers
url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json",
}

# Define your request body in a structured format
data = {
    "model": "qwen/qwen2.5-vl-3b-instruct:free",  # Change if using a different model
    "messages": [
        {
            "role": "user",
            "content": """
            Given the following information, provide a detailed treatment plan for the plant:

            - **Plant Name**: Tomato
            - **Disease Name**: Late Blight

            The response should include:
            1. Immediate Treatment steps (e.g., 'Prune infected areas', 'Apply fungicide').
            2. Preventive measures for future seasons.
            3. Maintenance instructions, such as frequency of monitoring.
            4. Any additional notes like warnings or best practices.
            """
        }
    ]
}

# Send the POST request to the API
response = requests.post(url, headers=headers, data=json.dumps(data))

# Check if the response is successful (status code 200)
if response.status_code == 200:
    # Get the response content
    response_data = response.json()
    
    # Extract the treatment plan from the response
    treatment_plan = response_data['choices'][0]['message']['content']
    
    # Print the formatted treatment plan
    print("Treatment Plan:\n")
    print(treatment_plan)
else:
    print(f"Error: {response.status_code}, {response.text}")
