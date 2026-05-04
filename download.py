import os
import urllib.request

urls = {
    "hero_view.png": "https://lh3.googleusercontent.com/aida/ADBb0uj-rwpeR05WZBAez8CQCHNdY5xFS2y8-99yNggRzL4xkwjObxqP8hFvSikNJz-iniRJ5Tmn6aWoW5P0leLQKvoK3fBA0HYl4w3oF6buUSHat6tYfg5p_Tlpv2wxfmHZ63FHRjjNpzkWq1t6ukSROfAyjBI02xf6rEUOOSoG4-rcxlsVdn4XLHTtGN5Zh7sa5QTLZxKSLVGVnFu68niIGQcPTdMhyN1LzABwwwxglpmL5k2v589aZq2U-OQ",
    "hero_view.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRkMmQ4MjMyYTUwMDQ1ZjBhOGY1NjAxNzk3N2Y2Zjc4EgsSBxDu7IqG-hkYAZIBIwoKcHJvamVjdF9pZBIVQhMzOTUzNTEyODYwNDU4Nzg5Nzc5&filename=&opi=89354086",
    "calculator_view.png": "https://lh3.googleusercontent.com/aida/ADBb0ujHph1W_cGoX2-vAgnB3UU7tkxa6UzBUBNpquXdNmO3FW2ZoTEFwe-fEkusPk1rdBuHYLqs7GnR6jXJ_OCP8yBp6d9fSA8J4bBMH56NYrQNZ7Pi1LjVDmpib3o1vBbMIbaMAdtmk_gzeZCe7yPYEF2k5THp_w-MApkgjF-CV0WZFAxf4_5A7-DaCFB-a1Xz01YNprWpvqSv31JLiAeTtVl8SVYLCBIUMLIRANL9PXU9xowMSSuLw718ANs",
    "calculator_view.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2UwMGU0N2UzNGUzYTQxN2U5NGIyNzU0NzU2N2QxOGQxEgsSBxDu7IqG-hkYAZIBIwoKcHJvamVjdF9pZBIVQhMzOTUzNTEyODYwNDU4Nzg5Nzc5&filename=&opi=89354086",
    "solutions_view.png": "https://lh3.googleusercontent.com/aida/ADBb0uhgYJTMROKOcjN8b03VjV9HgS3kIPAr3buIi-0dsbH_UQVWAEXP4RaqMwAVITD_uuD36mhTuKe9qsIq0m3TT1LJwkrSKQuB1HQohCGZTOg5_2zwmBXWG_Mbh7-34jgumJAh5bhm_CtvyE-3FrnVoe9SS2hkFUdkQpOPJ5AliJln7NMiO6AcrAw1-mKF4UvFxHUwoFlS6-bd-LFriyBcVeow94qmyDglBYYREXTG9HzgDar1tMtQ70Fif3o",
    "solutions_view.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNiZjVhY2UzODE5ODQzNWQ4YjZkODUzYjExYmI3MDBhEgsSBxDu7IqG-hkYAZIBIwoKcHJvamVjdF9pZBIVQhMzOTUzNTEyODYwNDU4Nzg5Nzc5&filename=&opi=89354086",
    "technical_stack.png": "https://lh3.googleusercontent.com/aida/ADBb0ugYDWfSNoxHaaEfsvbVDTsLKI1jL390cm3UIFBnM9_YLPrvjnmGpRdzsnJISM5m809xlDIO3iRN8l7HW4-VJLwWQGi7OeWRwEqRRQqhmSdAbUGQVS_NuVWR3qW-VrKq-JnMXDIg-FMvufP1TsBGj97s_iWkXNNil5Wtxs2pMPjsAMXQ8npfxG9GtzzQoV-ae_RCliYx_PjK3kzLqn_n0uTol-cCMmomDcjp09fmqvD8H3Wex24A8RmLjw",
    "technical_stack.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzBhNjQ2ZTJhY2Q2ZTRmYzliYWQxNDcyYjRlOTIzNThmEgsSBxDu7IqG-hkYAZIBIwoKcHJvamVjdF9pZBIVQhMzOTUzNTEyODYwNDU4Nzg5Nzc5&filename=&opi=89354086",
    "footer_view.png": "https://lh3.googleusercontent.com/aida/ADBb0ujGIWB1PNpFGsEoI1-zXS1mpi9BikPGk_qLLIAr-mP2FfsQYv52Qj-2JzMvIoMxkrKh_gcyRieWu9ndaEhcS7ikDP4ZzjWac67DaDkL5VvblLZoCcRxoO0aSxE9qA2Ss-Uf9W_9ZWcly9Jmqlg367TkIw7asONVKviDhNcBecPHGzlfSWYiAG7GLcSacFB0_yRxRnyoO9WU0gAQAFfbYF7F3ysj0wJ3mzaAdk58snheaEjQMX-R19QhgjM",
    "footer_view.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2U4MTEzMDYyYzgzYjRhNDk4ZWE0MWU2MzdjOWQ2NWI3EgsSBxDu7IqG-hkYAZIBIwoKcHJvamVjdF9pZBIVQhMzOTUzNTEyODYwNDU4Nzg5Nzc5&filename=&opi=89354086"
}

os.makedirs("stitch_assets", exist_ok=True)
for filename, url in urls.items():
    print(f"Downloading {filename}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        with open(os.path.join("stitch_assets", filename), 'wb') as out_file:
            out_file.write(response.read())
print("Done.")
