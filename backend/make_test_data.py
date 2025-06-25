import pandas as pd

# Load the original CSV file 
df = pd.read_csv("model/creditcard.csv")

# Drop the Class column
df = df.drop("Class", axis=1)

# Take first 10 rows for testing
df_sample = df.head(10)

# Save as test_data.csv inside model/
df_sample.to_csv("model/test_data.csv", index=False)

print("test_data.csv created successfully in the model folder.")
