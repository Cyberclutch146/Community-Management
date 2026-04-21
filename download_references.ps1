$OutputDir = "scratch/stitch_html"
New-Item -ItemType Directory -Force -Path $OutputDir

$Screens = @(
    @{ Name = "Event_Details.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzdkODY3NDNlMWNlNTQ0NTliNmMwNWVlY2M5MjgxYzhhEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Organizer_Dashboard.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNjMGEwZTA4MWEzMjQ4MWY4ZDM5MmQ2NDAxYThkMGI3EgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Home_Events_Feed_Mobile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2U4Yjg2ZmZmZjExMDQ5ZTViOTI3NWM3NDM2YzBhMGZlEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Organizer_Dashboard_Mobile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VjZjY0ZTU0ZTc0NjQyNmI5YjNjMTVjMjU2MDVlZTE2EgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Event_Details_Mobile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzczMDMxOTkwYjMzMjQxMjA4MjdlMTY1OTU2YWJhNzUwEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Create_Event_Mobile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2E2NjFiMmU2ZTdhMDQ1Y2RiZDA3NjZhYzIyY2YzZDFjEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Home_Local_Events_Feed.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU1MTI3ZGFlMDc1YjQ4NDM5ZGVmMTY0MjhjNDgzMDE3EgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "User_Profile_Mobile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzRkZTQ3MzllZWJlZDRjMjVhOTFhZDU2MzRmYWE0MzkyEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Community_Chat_Mobile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2NiZjc1NDdiYzFiMDQ5NTM4NTk0NjRkY2E4NmUzOGVmEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Community_Chat.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBhN2RjNmU0NjZmOTRkZjk5MDEyNTcwNTIzNmI5ZDVlEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "Create_Event.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQyMzdmOTE0NWQ5OTQ4ODBiZDg2N2U2N2RhOWMzYzRlEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" },
    @{ Name = "User_Profile.html"; Url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg5YTE0ZTJlZWVkYzQ4MjU5NjAwZmJmZGFmNDY4MDAxEgsSBxCSu4n1xwsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTM2NzM1MjI4NjU1MTg0Mzc4Mg&filename=&opi=89354086" }
)

foreach ($screen in $Screens) {
    $FilePath = Join-Path $OutputDir $screen.Name
    curl.exe -s -L -o $FilePath $screen.Url
    Write-Host "Downloaded $($screen.Name)"
}
